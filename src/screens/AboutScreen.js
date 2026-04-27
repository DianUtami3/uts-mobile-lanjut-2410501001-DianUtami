import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
     <Image
  source={require("../../assets/images/profile.jpg")}
  style={styles.avatar}
/>

        <Text style={styles.title}>Dian Utami</Text>
        <Text style={styles.subtitle}>2410501001</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Lengkap</Text>

        <View style={styles.row}>
          <Ionicons name="person" size={19} color="#e50914" />
          <Text style={styles.text}>Nama: Dian Utami</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="card" size={19} color="#e50914" />
          <Text style={styles.text}>NIM: 2410501001</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="school" size={19} color="#e50914" />
          <Text style={styles.text}>Kelas: B</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="film" size={19} color="#e50914" />
          <Text style={styles.text}>Tema: B - MovieDex</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cloud-download" size={19} color="#e50914" />
          <Text style={styles.text}>API: TVMaze API</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tech Stack</Text>

        <View style={styles.badgeWrap}>
          <Text style={styles.badge}>React Native</Text>
          <Text style={styles.badge}>Expo</Text>
          <Text style={styles.badge}>React Navigation</Text>
          <Text style={styles.badge}>Fetch API</Text>
          <Text style={styles.badge}>Context API</Text>
          <Text style={styles.badge}>useReducer</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Deskripsi</Text>
        <Text style={styles.description}>
          MovieDex adalah aplikasi katalog film dan series yang mengambil data
          dari TVMaze API. Aplikasi ini memiliki fitur Home, Browse Genre,
          Detail Show, Favorit, Search, dan About sesuai requirement UTS
          Pemrograman Mobile Lanjut.
        </Text>
      </View>

      <Text style={styles.footer}>
        © 2026 MovieDex - TVMaze Public API
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: "#181818",
    alignItems: "center",
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#292929",
    marginBottom: 16,
  },
  avatar: {
    width: 135,
    height: 135,
    borderRadius: 80,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#e50914",
    backgroundColor: "#333",
  },
  title: {
    fontSize: 29,
    fontWeight: "900",
    color: "#fff",
  },
  subtitle: {
    color: "#aaa",
    marginTop: 6,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#181818",
    width: "100%",
    padding: 17,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#292929",
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },
  text: {
    color: "#ddd",
    fontSize: 15,
    marginLeft: 9,
    flex: 1,
  },
  badgeWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#e50914",
    color: "#fff",
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 7,
    marginBottom: 8,
    fontSize: 12,
  },
  description: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 23,
  },
  footer: {
    color: "#777",
    textAlign: "center",
    marginTop: 8,
  },
});