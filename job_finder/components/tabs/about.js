import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../constants";
import { make_request } from "../../constants/useGemini";

export default function About({ info }) {
  const [translatedInfo, setTranslatedInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const translateText = async () => {
      try {
        setLoading(true);
        const prompt = `Now will be text on kazakh language, answer on kazakh language: ${info}`;
        const response = await make_request(prompt);
        if (response) {
          setTranslatedInfo(response);
        }
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedInfo("Аудару кезінде қате орын алды.");
      } finally {
        setLoading(false);
      }
    };

    translateText();
  }, [info]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Бұл жұмыс туралы ақпарат:</Text>

      <View style={styles.contentBox}>
        {loading ? (
          <Text style={styles.loadingText}>Жүктелуде...</Text>
        ) : (
          <Text style={styles.contentText}>{translatedInfo}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  contentBox: {
    marginTop: SIZES.medium,
  },
  contentText: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontFamily: FONTS.regular,
  },
  loadingText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONTS.medium,
    fontStyle: "italic",
  },
});
