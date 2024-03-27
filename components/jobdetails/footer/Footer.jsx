import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./footer.style";
import { icons } from "../../../constants";

export default function Footer({ url }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedLikeStatus = await AsyncStorage.getItem("isLiked");
        setIsLiked(storedLikeStatus !== null && JSON.parse(storedLikeStatus));
      } catch (error) {
        console.error("Error loading like status:", error);
      }
    })();
  }, []);

  const handleLikePress = async () => {
    setIsLiked((prevLiked) => !prevLiked);
    try {
      await AsyncStorage.setItem("isLiked", JSON.stringify(!isLiked));
    } catch (error) {
      console.error("Error saving like status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.likeBtn, isLiked ? styles.likeBtnActive : null]}
        onPress={handleLikePress}
      >
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={[
            styles.likeBtnImage,
            isLiked ? styles.likeBtnImageActive : null,
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
}
