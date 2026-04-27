import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShowCard from "../components/ShowCard";
import { searchShows } from "../utils/api";

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [errorInput, setErrorInput] = useState("");
  const [errorApi, setErrorApi] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const cleanKeyword = keyword.trim();

    if (cleanKeyword === "") {
      setErrorInput("Input tidak boleh kosong");
      setResults([]);
      return;
    }

    if (cleanKeyword.length < 3) {
      setErrorInput("Minimal 3 karakter");
      setResults([]);
      return;
    }

    Keyboard.dismiss();
    setErrorInput("");
    setErrorApi("");
    setLoading(true);
    setSearched(true);

    try {
  const shows = await searchShows(cleanKeyword);
  setResults(shows);
} catch (err) {
  setErrorApi("Gagal memuat data");
  setResults([]);
} finally {
  setLoading(false);
}
  };

  const clearSearch = () => {
    setKeyword("");
    setResults([]);
    setErrorInput("");
    setErrorApi("");
    setSearched(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Ionicons name="search" size={26} color="#e50914" />
              <Text style={styles.header}>Search MovieDex</Text>
              <Text style={styles.subtitle}>
                Cari film atau series favorit kamu berdasarkan judul show.
              </Text>
            </View>

            <View style={styles.searchBox}>
              <Ionicons name="film-outline" size={20} color="#777" />

              <TextInput
                style={styles.input}
                placeholder="Masukkan judul show..."
                placeholderTextColor="#777"
                value={keyword}
                onChangeText={(text) => {
                  setKeyword(text);
                  setErrorInput("");
                }}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />

              {keyword.length > 0 ? (
                <TouchableOpacity onPress={clearSearch}>
                  <Ionicons name="close-circle" size={21} color="#777" />
                </TouchableOpacity>
              ) : null}
            </View>

            {errorInput ? (
              <Text style={styles.error}>{errorInput}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSearch}
              activeOpacity={0.85}
            >
              <Ionicons name="search" size={18} color="#fff" />
              <Text style={styles.buttonText}>Cari Show</Text>
            </TouchableOpacity>

            {loading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#e50914" />
                <Text style={styles.loadingText}>Mencari data...</Text>
              </View>
            ) : null}

            {errorApi ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color="#fff" />
                <Text style={styles.errorBoxText}>{errorApi}</Text>
              </View>
            ) : null}

            {searched && !loading && !errorApi ? (
              <Text style={styles.resultTitle}>
                Hasil pencarian: {results.length} show
              </Text>
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
          searched && !loading && !errorApi ? (
            <Text style={styles.empty}>Tidak ada hasil pencarian.</Text>
          ) : !searched ? (
            <Text style={styles.empty}>
              Masukkan minimal 3 karakter untuk mulai mencari.
            </Text>
          ) : null
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
    fontSize: 30,
    fontWeight: "900",
    marginTop: 10,
  },
  subtitle: {
    color: "#bdbdbd",
    marginTop: 8,
    lineHeight: 21,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#292929",
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 13,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#e50914",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "900",
    marginLeft: 7,
  },
  error: {
    color: "#ff5a5a",
    marginHorizontal: 18,
    marginTop: 7,
    fontWeight: "700",
  },
  loadingBox: {
    alignItems: "center",
    marginTop: 22,
  },
  loadingText: {
    color: "#fff",
    marginTop: 8,
  },
  errorBox: {
    flexDirection: "row",
    backgroundColor: "#b00020",
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  errorBoxText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },
  resultTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 6,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 28,
    marginHorizontal: 20,
    fontSize: 15,
    lineHeight: 22,
  },
});