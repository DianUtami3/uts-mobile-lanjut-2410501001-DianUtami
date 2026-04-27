import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ShowCard({ show, onPress }) {
  const imageUrl =
    show.image?.medium ||
    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {show.name}
        </Text>

        <Text style={styles.genre} numberOfLines={1}>
          {show.genres?.length > 0
            ? show.genres.join(", ")
            : "Genre tidak tersedia"}
        </Text>

        <View style={styles.row}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color="#ffd700" />
            <Text style={styles.ratingText}>
              {show.rating?.average || "N/A"}
            </Text>
          </View>

          <Text style={styles.status} numberOfLines={1}>
            {show.status || "Unknown"}
          </Text>
        </View>

        <Text style={styles.language}>
          {show.language ? `Language: ${show.language}` : "Language: -"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: "#252525",
  },
  image: {
    width: 88,
    height: 125,
    borderRadius: 12,
    backgroundColor: "#333",
  },
  info: {
    flex: 1,
    marginLeft: 13,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },
  genre: {
    fontSize: 13,
    color: "#bdbdbd",
    marginBottom: 9,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  status: {
    color: "#e50914",
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },
  language: {
    color: "#888",
    fontSize: 12,
  },
});