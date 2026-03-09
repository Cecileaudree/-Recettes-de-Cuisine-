import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";


const RecipeDetailScreen:React.FC<RecipeDetailScreenProps> = ({recette}) => {
  return (<ScrollView style={styles.container}>
    <Image source={{ uri: recette.image }} style={styles.image} />
        <View style={styles.header}>
          <Text style={styles.title}>{recette.titre}</Text>
          <Text style={styles.difficulty}>{recette.difficulte}</Text>
          <Text style={styles.time}>{recette.temps_preparation}</Text>
        </View>tainer}>

    <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingrédients :</Text>
        <FlatList
          data={recette.ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.ingredient}>- {item}</Text>
          )}
        />
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions :</Text>
        <FlatList
          data={recette.etapes_preparation}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.instruction}>
              {index + 1}. {item}
            </Text>
          )}
        />
      </View>
  </ScrollView>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  coverImage: {
    width: "100%",
    height: 300,
  },
  textContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 5,
  },
  genre: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: "italic",
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default BookDetailScreen;
