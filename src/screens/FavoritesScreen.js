import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ShowCard from "../components/ShowCard";
import { useFavorites } from "../context/FavoriteContext";

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Belum ada show favorit</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ShowCard
              show={item}
              onPress={() =>
                navigation.navigate("Detail", { showId: item.id })
              }
            />

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeFavorite(item.id)}
            >
              <Text style={styles.deleteText}>Hapus dari Favorit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    color: "#aaa",
    fontSize: 16,
  },

  cardWrapper: {
    marginBottom: 10,
  },

  deleteButton: {
    backgroundColor: "#e50914",
    marginHorizontal: 16,
    marginTop: -5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});