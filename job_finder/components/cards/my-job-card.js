import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons, SHADOWS } from "../../constants";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../constants/config";

export default function MyJobCard({ item, selectedJob, setSelectedJob }) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/job-details/${item?.id}`);
    setSelectedJob(item?.id);
  };

  console.log(item.logo)

  return (
    <TouchableOpacity
      style={styles.card(selectedJob, item?.id)}
      onPress={handlePress}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.employerWrapper}>
        <Image source={item.logo ? { uri: `${API_BASE_URL}/${item.logo}` } : icons.watpad} style={styles.employerLogo} />

        <Text style={styles.title}>{item?.title}</Text>
        </View>
        <View style={styles.iconRow}>
          <Image source={icons.heart} style={styles.icon} />
        </View>
      </View>

      {/* Salary & badges */}
      <Text style={styles.salary}>
      {parseInt(item?.salary)} {item?.currency}-ден, қолға берілетіні
      </Text>

      <View style={styles.badgeRow}>
        {item?.jdata.map((badge) => (
          <Text key={badge} style={styles.badge}>{badge}</Text>
        ))}
      </View>

      {/* Company and location */}
      <Text style={styles.company}>{item?.company}</Text>
      <Text style={styles.location}>{item?.location}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: (selectedJob, id) => ({
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.gray,
  }),
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    flexShrink: 1,
  },
  iconRow: {
    flexDirection: "row",
    gap: SIZES.xSmall,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  salary: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginTop: SIZES.small,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SIZES.xSmall,
    gap: SIZES.xSmall,

  },
  badge: {
    backgroundColor: COLORS.tertiary,
    color: COLORS.white,
    fontSize: SIZES.medium,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: 'bold'
  },
  company: {
    marginTop: SIZES.small,
    color: COLORS.secondary,
    fontFamily: FONTS.medium,
  },
  location: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginBottom: SIZES.medium,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: SIZES.small,
    marginTop: SIZES.small,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.small,
  },
  primaryText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
  secondaryButton: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.small,
  },
  secondaryText: {
    color: COLORS.gray,
    fontFamily: FONTS.medium,
  },
  employerLogo: {
    width: 50,
    height: 50,
  },
  employerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xSmall
  }
});
