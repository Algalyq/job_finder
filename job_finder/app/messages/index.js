import { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet,Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Navbar } from '../../components';
import { COLORS, FONTS, SIZES,icons, config } from '../../constants';

const Messages = () => {
  const router = useRouter();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChannels = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');

      const response = await axios.get(`${config.API_BASE_URL}/api/messages/channels/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setChannels(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load message channels');
      console.error('Error fetching channels:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchChannels, 10000);
    return () => clearInterval(interval);
  }, [fetchChannels]);

  const renderChannel = ({ item }) => (
    <TouchableOpacity
      style={styles.channelItem}
      onPress={() => router.push( `/messages/${item.job_id}`)}
    >

    <View style={{ flexDirection: 'row', alignItems: 'center',alignContent: 'center' }}>
      <Image source={item.logo ? { uri: item.logo } : icons.watpad}
           style={styles.logo}
        />
      <View style={styles.channelInfo}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.jobTitle}>{item.jobtitle.slice(0, 12)}</Text>
          {item.lastMessageTime && (
              <Text style={styles.timeStamp}>
                {new Date(item.lastMessageTime).toLocaleDateString()}
              </Text>
            )}
        </View>
      
        <View style={styles.messagePreview}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.last_message || 'Start a conversation'}
          </Text>
        </View>
      </View>
      </View>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: 'Messages',
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            color: COLORS.primary,
          },
        }}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : channels.length === 0 ? (
          <Text style={styles.emptyText}>No messages yet</Text>
        ) : (
          <FlatList
            data={channels}
            renderItem={renderChannel}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.channelsList}
          />
        )}
      </View>
      
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  channelsList: {
    paddingBottom: SIZES.medium,
  },
  channelItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  channelInfo: {
    flex: 1
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginRight: 10,
  },
  jobTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  companyName: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small + 2,
    color: COLORS.secondary,
  },
  messagePreview: {
    alignItems: 'flex-start',
  },
  lastMessage: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginRight: SIZES.small,
  },
  timeStamp: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  errorText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.error,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default Messages;
