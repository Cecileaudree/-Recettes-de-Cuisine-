import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet, TextInput } from "react-native";

import RecipeCard from "../components/RecipeCard";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const RecipeListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRecipes = recipesData.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Recettes</Text>
        <Text style={styles.headerSubtitle}>
          {filteredRecipes.length} recettes disponibles
        </Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
    color: "#1A1A2E",
    marginTop: 12,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});

export default RecipeListScreen;
