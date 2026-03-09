import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Recette } from '../types/recette';

interface RecipeCardProps {
  recette: Recette;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number, titre: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recette, 
  onPress, 
  isFavorite = false,
  onToggleFavorite
}) => {
  const handleFavoritePress = () => {
    if (onToggleFavorite) {
      onToggleFavorite(recette.id, recette.titre);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: recette.image }}
        style={styles.coverImage}
      />

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>{recette.titre}</Text>
          
          <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteBtn}>
            <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.time}>⏱️ {recette.temps_preparation}</Text>
        <Text style={styles.difficulty}>📊 {recette.difficulte}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  coverImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
    lineHeight: 22,
    paddingRight: 8,
  },
  favoriteBtn: {
    padding: 4,
  },
  time: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  difficulty: {
    fontSize: 13,
    color: '#999',
  }
});

export default RecipeCard;
