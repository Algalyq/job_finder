import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Keyboard,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import HeaderBtn from "../../components/shared/header-btn";
import { icons } from "../../constants";
import { make_request } from "../../constants/useGemini";

const ChatPage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const systemColorMode = useColorScheme() || "light";
  const mountedRef = useRef(true);

  // Simple color scheme
  const appColor = {
    main_bg: systemColorMode === "dark" ? "#1a1a1a" : "#f5f5f5",
    line_color: systemColorMode === "dark" ? "#444" : "#ccc",
    inverseWhiteBlack: systemColorMode === "dark" ? "#fff" : "#000",
    inverseBlackWhite: systemColorMode === "dark" ? "#000" : "#fff",
  };
  
  const handleBack = () => {
    console.log("Attempting to go back");
    if (router.canGoBack()) {
      router.back();
    } else {
      console.log("No back route, navigating to home");
      router.replace("/"); // Fallback to home screen
    }
  };

  const screenHeight = Dimensions.get("window").height;
  const offset = screenHeight * 0.11;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardOffset(offset);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [offset]);

  const handleSubmitPrompt = useCallback(() => {
    if (prompt.length === 0) return;
    const message = { content: prompt, sender: "user" };
    setConversation((prev) => [...prev, message]);
    handlePromptChatGPT(prompt);
    setPrompt("");
  }, [prompt, handlePromptChatGPT]);

  const handlePromptChatGPT = useCallback(async (prompt) => {
    if (!mountedRef.current) return;
    setIsTyping(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      const response = await make_request(prompt);
      if (!mountedRef.current) return; // Check again after await
      if (!response) {
        console.log('Қате орын алды, қайталап көріңіз');
        return;
      }
      const message = { content: response, sender: "system" };
      setConversation((prev) => [...prev, message]);
    } catch (error) {
      console.error("Chat request failed:", error);
    } finally {
      if (mountedRef.current) setIsTyping(false);
    }
  }, []);

  // Typing Indicator Component (inline)
  const TypingIndicator = () => {
    const [dotOpacity] = useState(new Animated.Value(0));
    const animationRef = useRef(null);

    useEffect(() => {
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(dotOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.current.start();

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }, [dotOpacity]);

    return (
      <View style={styles.typingContainer}>
        <Animated.Text style={[styles.typingDot, { opacity: dotOpacity }]}>.</Animated.Text>
        <Animated.Text style={[styles.typingDot, { opacity: dotOpacity, marginLeft: 5 }]}>.</Animated.Text>
        <Animated.Text style={[styles.typingDot, { opacity: dotOpacity, marginLeft: 5 }]}>.</Animated.Text>
      </View>
    );
  };

  // Inline conversation rendering
  const renderConversation = () => {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: appColor.main_bg }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        {conversation.length > 0 || isTyping ? (
          <View style={{ paddingHorizontal: 20 }}>
            {conversation.map((message, index) => (
              <View
                key={index}
                style={{
                  alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: message.sender === "user" ? "#007AFF" : "#e0e0e0",
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                  maxWidth: "70%",
                }}
              >
                <Text
                  style={{
                    color: message.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  {message.content}
                </Text>
              </View>
            ))}
            {isTyping && (
              <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
                <TypingIndicator />
              </View>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: appColor.inverseWhiteBlack, fontSize: 18 }}>Әзірше хабарламалар жоқ</Text>
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: appColor.main_bg }}>

      <View style={{ flexDirection: "row",   padding: 16, }}>
        <HeaderBtn
          icon={icons.left}
          dimensions={24}
          onPress={() => handleBack()}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? offset : 0}
      >
        {renderConversation()}
        <View style={[styles.textBoxContainer, { backgroundColor: appColor.main_bg }]}>
          <View style={{ flex: 1, position: "relative", justifyContent: "flex-end" }}>
            <TextInput
              multiline
              style={[
                styles.textInput,
                { borderWidth: 1, borderColor: appColor.line_color, color: appColor.inverseWhiteBlack },
              ]}
              placeholder="Мұнда теріңіз"
              value={prompt}
              placeholderTextColor={appColor.line_color}
              onChangeText={(text) => setPrompt(text)}
            />
          </View>
          <TouchableOpacity
            onPress={handleSubmitPrompt}
            style={{
              backgroundColor: "#007AFF",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Жіберу</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    minHeight: 40,
    borderRadius: 20,
    width: "100%",
    paddingHorizontal: 14,
    fontSize: 20,
    maxHeight: 220,
    paddingVertical: 10,
  },
  textBoxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    zIndex: 1,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 15,
  },
  typingDot: {
    fontSize: 20,
    color: "#333",
  },
});

export default ChatPage;