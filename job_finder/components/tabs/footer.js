import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Footer({ url, data }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await AsyncStorage.getItem("access");
        setAccessToken(token);

        if (token && data && data.length > 0) {
          await checkIfSaved(token);
        }
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    };
    initialize();
  }, [data]);

  const checkIfSaved = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/new-saved-jobs/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const savedJobs = response.data.jobs || response.data;
      const currentJob = {
        title: data[0].job_title,
        company: data[0].employer_name,
        logo: data[0].employer_logo,
      };

      const isSaved = savedJobs.some(
        (job) =>
          job.title === currentJob.title &&
          job.company === currentJob.company &&
          job.logo === currentJob.logo
      );
      setIsBookmarked(isSaved);
    } catch (err) {
      console.error("Error checking saved jobs:", err.response?.data || err.message);
    }
  };

  const saveJob = async () => {
    if (!data || data.length === 0) return;

    const logo = data[0].employer_logo;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/new-saved-jobs/",
        {
          id: data[0].job_id,
          job_id: data[0].job_id,
          title: data[0].job_title,
          company: data[0].employer_name,
          logo: logo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setIsBookmarked(true);
        console.log("Job saved successfully:", response.data);
      }
    } catch (err) {
      console.error("Error saving job:", err.response?.data || err.message);
    }
  };
  const deleteJob = async (jobId) => {
    try {
      console.log('Deleting job with ID:', jobId);
      const response = await axios.delete(
        `http://localhost:8000/api/new-saved-jobs/${jobId}/`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          }
        }
      );

      if (response.status === 204) {
        console.log("Job deleted successfully");
        setIsBookmarked(false);
      }
    } catch (err) {
      console.error("Error deleting job:", err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.heartBtn, { backgroundColor: isBookmarked ? COLORS.tertiary : "transparent" }]}
        onPress={() => {
          if (isBookmarked) {
              deleteJob(data[0].job_id);
              setIsBookmarked(false);
          } else {
              saveJob();
          }
      }}
      >
        <Ionicons
          name={isBookmarked ? "heart" : "heart-outline"}
          size={24}
          color={isBookmarked ? COLORS.white : COLORS.tertiary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.xLarge,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
  },
  heartBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  heartBtnIcon: {
    width: "40%",
    height: "40%",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
  },
});