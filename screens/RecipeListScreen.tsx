import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Recette } from '../types/recette';
import { RootStackParamList } from '../types/navigation';
import recettesData from '../data/recettes';
import RecipeCard from '../components/RecipeCard';

type RecipeListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecipeList'
>;

const RecipeListScreen: React.FC = () => {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState<string>('');
  // État pour les favoris (set de IDs)
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  // Hook de navigation
  const navigation = useNavigation<RecipeListNavigationProp>();

  // ✅ FILTRAGE EN TEMPS RÉEL (TP2)
  // Quand l'utilisateur tape, on filtre les recettes
  const filteredRecettes = recettesData.filter((recette) =>
    recette.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ NAVIGATION VERS DÉTAIL (TP3)
  // Au clic sur une recette, on envoie la recette à l'écran de détail
  const handleRecipePress = (recette: Recette) => {
    navigation.navigate('RecipeDetail', { recette });
  };

  // ✅ GESTION DES FAVORIS (TP4)
  // Toggle favori + alert
  const toggleFavorite = (id: number, titre: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      Alert.alert('Retiré', `${titre} retiré des favoris`);
    } else {
      newFavorites.add(id);
      Alert.alert('Ajouté', `${titre} ajouté aux favoris`);
    }
    setFavorites(newFavorites);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER avec titre et recherche */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍳 Recettes</Text>
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
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => handleRecipePress(item)}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.recipeTitle}>{item.titre}</Text>
                <Text style={styles.recipeInfo}>⏱️ {item.temps_preparation}</Text>
                <Text style={styles.recipeInfo}>
                  📊 Difficulté: {item.difficulte}
                </Text>
              </View>

              {/* ✅ BOUTON FAVORI (TP4 - TouchableOpacity + Alert) */}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id, item.titre)}
              >
                <Text style={styles.favoriteText}>
                  {favorites.has(item.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7A7A8E',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 16,
    color: '#1A1A2E',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  recipeCard: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  recipeInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  favoriteButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  favoriteText: {
    fontSize: 28,
  },
});

export default RecipeListScreen;
