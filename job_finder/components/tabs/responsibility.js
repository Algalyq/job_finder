import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../constants";
import { make_request } from "../../constants/useGemini";

export default function Responsibility({ info }) {
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
      <Text style={styles.title}>Міндеттері: </Text>

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
    marginVertical: SIZES.medium,
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: SIZES.small / 1.25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  contentText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginLeft: SIZES.small,
  },
});
