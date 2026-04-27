import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShowCard from "../components/ShowCard";
import { getShows } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const genres = ["Drama", "Comedy", "Action", "Science-Fiction", "Romance"];

  const loadShows = async () => {
    try {
      setError("");
      const data = await getShows();
      setShows(data.slice(0, 60));
    } catch (err) {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadShows();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadShows();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Memuat katalog MovieDex...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shows}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#e50914"
            colors={["#e50914"]}
          />
        }
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Text style={styles.badge}>TVMaze Catalog</Text>
              <Text style={styles.header}>MovieDex</Text>
              <Text style={styles.subtitle}>
                Temukan film dan series populer berdasarkan genre, rating, dan detail show.
              </Text>

              <View style={styles.statsBox}>
                <Ionicons name="film" size={18} color="#e50914" />
                <Text style={styles.statsText}>{shows.length} shows tersedia</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Browse Genre</Text>

            <View style={styles.genreContainer}>
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={styles.genreButton}
                  onPress={() => navigation.navigate("Browse", { genre })}
                  activeOpacity={0.8}
                >
                  <Ionicons name="pricetag" size={13} color="#fff" />
                  <Text style={styles.genreText}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Popular Shows</Text>

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
    fontSize: 14,
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
  badge: {
    color: "#e50914",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  header: {
    fontSize: 34,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    color: "#bdbdbd",
    fontSize: 14,
    lineHeight: 21,
  },
  statsBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101010",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,
  },
  statsText: {
    color: "#fff",
    marginLeft: 7,
    fontWeight: "700",
    fontSize: 13,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 12,
    marginBottom: 12,
  },
  genreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e50914",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 22,
    margin: 4,
  },
  genreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
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
});