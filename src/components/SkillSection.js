import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // for the edit icon
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SkillSection = ({ skills }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_VISIBLE_SKILLS = 5;
  const navigation = useNavigation();
  const visibleSkills = Array.isArray(skills) ? (expanded ? skills : skills.slice(0, MAX_VISIBLE_SKILLS)) : [];
  const remainingSkillsCount = Array.isArray(skills) ? skills.length - MAX_VISIBLE_SKILLS : 0;
  
  return (
    <View style={styles.section}>
       <TouchableOpacity 
          style={styles.sectionButton}
          onPress={() => navigation.navigate("SkillSelectionScreen")}>
            <View style={styles.sectionIcon}>
              <Ionicons name="bulb-outline" size={24} color="#FF9500" />
            </View>
                <Text style={styles.sectionTitle}>Education experience</Text>
                {skills ? (<Ionicons name="pencil-outline" size={24} color="#FF9500" />) : (<Ionicons name="add-circle" size={24} color="#FF9500" />)}
                
        </TouchableOpacity>

        <View style={styles.separator} />

        <View style={styles.skillsContainer}>
  {visibleSkills && visibleSkills.length > 0 && visibleSkills.map((skill, index) => (
    <View key={index} style={styles.skillTag}>
      <Text style={styles.skillText}>{skill}</Text>
    </View>
  ))}
  {!expanded && remainingSkillsCount > 0 && (
    <Text style={styles.moreText}>+{remainingSkillsCount} more</Text>
  )}
</View>



      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.seeMore}>{expanded ? 'See less' : 'See more'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  skillTag: {
    backgroundColor: '#F0F4F8',
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 16,
    color: '#505050',
  },
  moreText: {
    fontSize: 17,
    color: '#6C63FF',
    alignSelf: 'center',
    marginLeft: 8,
  },
  seeMore: {
    fontSize: 14,
    color: '#6C63FF',
    marginTop: 12,
    textAlign: 'center',
  },
  section: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
},
sectionButton: {
  flexDirection: 'row',
  alignItems: 'center'
},

sectionIcon: {
  marginRight: 12,
},
sectionTitle: {
  flex: 1,
  fontSize: 16,
  fontWeight: 'bold',
},
subSection: {
  flexDirection: 'row',
  justifyContent: 'space-between'
},
separator: {
  height: 0.5,
  backgroundColor: '#E0E0E0', 
  width: '100%',              
  marginVertical: 8,          
},
});

export default SkillSection;
