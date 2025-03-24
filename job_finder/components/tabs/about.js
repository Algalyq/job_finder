import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../constants";
import { make_request } from "../../constants/useGemini";

export default function About({ info }) {
  const [translatedInfo, setTranslatedInfo] = useState(info);

  useEffect(() => {
    const translateText = async () => {
      try {
        const prompt = `Translate this job description to Kazakh, dont write comments: ${info}`;
        const response = await make_request(prompt);
        if (response) {
          setTranslatedInfo(response);
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateText();
  }, [info]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Бұл жұмыс туралы ақпарат:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{translatedInfo}</Text>
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
    fontSize: SIZES.small,
    color: COLORS.secondary,
    fontFamily: FONTS.regular,
  },
});
