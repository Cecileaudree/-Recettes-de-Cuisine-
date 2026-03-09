import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Recette } from "../types/recette";
import { RootStackParamList } from "../types/navigation";
import recettesData from "../data/recettes";
import RecipeCard from "../components/RecipeCard";

type RecipeListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RecipeList"
>;

const RecipeListScreen: React.FC = () => {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState<string>("");
  // État pour les favoris (set de IDs)
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  // Hook de navigation
  const navigation = useNavigation<RecipeListNavigationProp>();

  // ✅ FILTRAGE EN TEMPS RÉEL (TP2)
  const filteredRecettes = recettesData.filter((recette) =>
    recette.titre.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ✅ NAVIGATION VERS DÉTAIL (TP3)
  const handleRecipePress = (recette: Recette) => {
    navigation.navigate("RecipeDetail", { recette });
  };

  // ✅ GESTION DES FAVORIS (TP4)
  const toggleFavorite = (id: number, titre: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      Alert.alert("Retiré", `${titre} retiré des favoris`);
    } else {
      newFavorites.add(id);
      Alert.alert("Ajouté", `${titre} ajouté aux favoris`);
    }
    setFavorites(newFavorites);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER avec titre et recherche */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍳 Recettes de Cuisine</Text>
        <Text style={styles.headerSubtitle}>
          {filteredRecettes.length} recette(s)
        </Text>

        {/* ✅ BARRE DE RECHERCHE (TP4 - TextInput) */}
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une recette..."
          placeholderTextColor="#9090AA"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ✅ LISTE DES RECETTES (TP2 - FlatList) */}
      <FlatList
        data={filteredRecettes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recette={item}
            onPress={() => handleRecipePress(item)}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#7A7A8E",
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    fontSize: 16,
    color: "#1A1A2E",
  },
  listContent: {
    paddingVertical: 10,
  },
});

export default RecipeListScreen;
