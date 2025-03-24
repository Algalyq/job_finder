import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../constants";
import { make_request } from "../../constants/useGemini";

export default function Responsibility({ info }) {
  const [translatedItems, setTranslatedItems] = useState(info);

  useEffect(() => {
    const translateItems = async () => {
      try {
        const translatedArray = await Promise.all(
          info.map(async (item) => {
            const prompt = `Translate this job responsibility to Kazakh, dont write comments: ${item}`;
            const response = await make_request(prompt);
            return response || item;
          })
        );
        setTranslatedItems(translatedArray);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateItems();
  }, [info]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Міндеттері: </Text>

      <View style={styles.contentBox}>
        {translatedItems.map((item, index) => (
          <View style={styles.infoWrapper} key={item + index}>
            <Text style={styles.dot} />
            <Text style={styles.contentText}>{item}</Text>
          </View>
        ))}
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
    marginVertical: SIZES.small,
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
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginLeft: SIZES.small,
  },
});
