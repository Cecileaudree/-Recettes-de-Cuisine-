import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

type RecipeDetailRouteProp = RouteProp<RootStackParamList, "RecipeDetail">;

interface Props {
  route: RecipeDetailRouteProp;
}

const RecipeDetailScreen: React.FC<Props> = ({ route }) => {
  // ✅ RÉCUPÉRER LA RECETTE DEPUIS LES PARAMÈTRES (TP3)
  // route.params.recette contient la recette qu'on a envoyée depuis RecipeListScreen
  const { recette } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* IMAGE DE LA RECETTE */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recette.image }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        {/* CONTENU TEXTUEL */}
        <View style={styles.content}>
          {/* TITRE */}
          <Text style={styles.title}>{recette.titre}</Text>

          {/* INFOS PRINCIPALES */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>⏱️ Temps</Text>
              <Text style={styles.metaValue}>{recette.temps_preparation}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>📊 Difficulté</Text>
              <Text style={styles.metaValue}>{recette.difficulte}</Text>
            </View>
          </View>

          {/* INGRÉDIENTS */}
          <Text style={styles.sectionTitle}>📦 Ingrédients</Text>
          <FlatList
            data={recette.ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.ingredient}>- {item}</Text>
            )}
          />

          {/* ÉTAPES DE PRÉPARATION */}
          {recette.etapes_preparation &&
            recette.etapes_preparation.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>
                  👨‍🍳 Étapes de Préparation
                </Text>
                <FlatList
                  data={recette.etapes_preparation}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Text style={styles.instruction}>
                      {index + 1}. {item}
                    </Text>
                  )}
                />
              </>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
  },
  coverImage: {
    width: 250,
    height: 200,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: 15,
    textAlign: "center",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingVertical: 15,
  },
  metaItem: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginTop: 20,
    marginBottom: 12,
  },
  ingredient: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    color: "#555",
    lineHeight: 24,
    marginBottom: 12,
  },
});

export default RecipeDetailScreen;
