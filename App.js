import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { FavoriteProvider } from "./src/context/FavoriteContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <FavoriteProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#0f0f0f" />
        <AppNavigator />
      </View>
    </FavoriteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
});