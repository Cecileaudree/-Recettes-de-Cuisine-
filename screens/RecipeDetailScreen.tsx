import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const BookDetailScreen = () => {
  return <ScrollView style={styles.container}></ScrollView>;
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
