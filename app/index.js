import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "../components/onboarding/Onboarding";
import Home from "./home";

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("viewedOnboarding");
      if (value != null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkOnboarding();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? <Loading /> : viewedOnboarding ? <Home /> : <Onboarding />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
