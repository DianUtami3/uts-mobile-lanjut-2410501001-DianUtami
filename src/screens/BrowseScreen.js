import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShowCard from "../components/ShowCard";
import { getShows } from "../utils/api";

export default function BrowseScreen({ route, navigation }) {
  const { genre } = route.params;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadByGenre = async () => {
    try {
      setError("");
      const data = await getShows();
      const filtered = data.filter((item) =>
        item.genres?.includes(genre)
      );
      setShows(filtered);
    } catch (err) {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadByGenre();
  }, [genre]);

  const onRefresh = () => {
    setRefreshing(true);
    loadByGenre();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Memuat genre {genre}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shows}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Ionicons name="pricetag" size={24} color="#e50914" />
              <Text style={styles.header}>Genre: {genre}</Text>
              <Text style={styles.subtitle}>
                Menampilkan daftar show berdasarkan genre pilihan.
              </Text>

              <View style={styles.countBox}>
                <Text style={styles.countText}>{shows.length} show ditemukan</Text>
              </View>
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color="#fff" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <ShowCard
            show={item}
            onPress={() => navigation.navigate("Detail", { showId: item.id })}
          />
        )}
        ListEmptyComponent={
          !error ? (
            <Text style={styles.emptyText}>
              Tidak ada show untuk genre ini.
            </Text>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#e50914"
            colors={["#e50914"]}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: "#0f0f0f",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
  },
  listContent: {
    paddingBottom: 18,
  },
  hero: {
    backgroundColor: "#181818",
    margin: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#292929",
  },
  header: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 10,
  },
  subtitle: {
    color: "#bdbdbd",
    marginTop: 8,
    lineHeight: 21,
  },
  countBox: {
    backgroundColor: "#101010",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 14,
  },
  countText: {
    color: "#e50914",
    fontWeight: "800",
  },
  errorBox: {
    flexDirection: "row",
    backgroundColor: "#b00020",
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  errorText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },
  emptyText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
  },
});