import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import BrowseScreen from "../screens/BrowseScreen";
import DetailScreen from "../screens/DetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackOptions = {
  headerStyle: { backgroundColor: "#0f0f0f" },
  headerTintColor: "#ffffff",
  headerTitleStyle: { fontWeight: "bold" },
  contentStyle: { backgroundColor: "#0f0f0f" },
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="MovieDex" component={HomeScreen} />
      <Stack.Screen name="Browse" component={BrowseScreen} options={{ title: "Browse Genre" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detail Show" }} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="FavoritList" component={FavoritesScreen} options={{ title: "Favorit Saya" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detail Show" }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="SearchPage" component={SearchScreen} options={{ title: "Cari Show" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detail Show" }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0f0f0f",
            borderTopColor: "#222",
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarActiveTintColor: "#e50914",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = "home-outline";

            if (route.name === "Home") iconName = "home";
            if (route.name === "Favorit") iconName = "heart";
            if (route.name === "Search") iconName = "search";
            if (route.name === "About") iconName = "person";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favorit" component={FavoriteStack} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}