import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getShowDetail } from "../utils/api";
import { useFavorites } from "../context/FavoriteContext";

function cleanHtml(text) {
  if (!text) return "Summary tidak tersedia";
  return text.replace(/<[^>]+>/g, "");
}

export default function DetailScreen({ route }) {
  const { showId } = route.params;

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setError("");
        const data = await getShowDetail(showId);
        setShow(data);
      } catch (err) {
        setError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [showId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Memuat detail show...</Text>
      </View>
    );
  }

  if (error || !show) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={44} color="#e50914" />
        <Text style={styles.error}>Gagal memuat data</Text>
      </View>
    );
  }

  const favorite = isFavorite(show.id);
  const imageUrl =
    show.image?.original ||
    show.image?.medium ||
    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />

      <View style={styles.content}>
        <Text style={styles.title}>{show.name}</Text>

        <View style={styles.infoRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={15} color="#ffd700" />
            <Text style={styles.ratingText}>
              {show.rating?.average || "N/A"}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{show.status || "Unknown"}</Text>
          </View>
        </View>

        <View style={styles.genreContainer}>
          {show.genres?.length > 0 ? (
            show.genres.map((genre) => (
              <View key={genre} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.normalText}>Genre: -</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informasi Show</Text>

          <View style={styles.detailRow}>
            <Ionicons name="language" size={17} color="#e50914" />
            <Text style={styles.detailText}>
              Language: {show.language || "-"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={17} color="#e50914" />
            <Text style={styles.detailText}>
              Schedule: {show.schedule?.days?.join(", ") || "-"}{" "}
              {show.schedule?.time || ""}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="tv" size={17} color="#e50914" />
            <Text style={styles.detailText}>
              Type: {show.type || "-"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time" size={17} color="#e50914" />
            <Text style={styles.detailText}>
              Runtime: {show.runtime ? `${show.runtime} menit` : "-"}
            </Text>
          </View>
        </View>

        <Text style={styles.section}>Summary</Text>
        <Text style={styles.summary}>{cleanHtml(show.summary)}</Text>

        <TouchableOpacity
          style={[styles.button, favorite && styles.removeButton]}
          activeOpacity={0.85}
          onPress={() => {
            if (favorite) {
              removeFavorite(show.id);
            } else {
              addFavorite(show);
            }
          }}
        >
          <Ionicons
            name={favorite ? "heart-dislike" : "heart"}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {favorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  poster: {
    width: "100%",
    height: 470,
    backgroundColor: "#222",
  },
  content: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 31,
    fontWeight: "900",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242424",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 5,
  },
  statusBadge: {
    backgroundColor: "#e50914",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  genreChip: {
    backgroundColor: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 18,
    marginRight: 7,
    marginBottom: 7,
  },
  genreText: {
    color: "#ddd",
    fontWeight: "700",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#181818",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#292929",
    marginBottom: 18,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  detailText: {
    color: "#cfcfcf",
    marginLeft: 8,
    flex: 1,
  },
  section: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 8,
  },
  summary: {
    color: "#cfcfcf",
    fontSize: 15,
    lineHeight: 23,
  },
  normalText: {
    color: "#ccc",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#e50914",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 34,
  },
  removeButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "900",
    marginLeft: 8,
  },
  error: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "700",
  },
});