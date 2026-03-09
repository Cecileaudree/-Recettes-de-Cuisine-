import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import { Recette } from "../types/recette";
interface RecipeCardProps {
  recette: Recette;
}

const RecipeCard = ({ recette }: RecipeCardProps) => {
  return (
    <TouchableOpacity>
      <Image source={{ uri: recette.image }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.title}>{recette.titre}</Text>
        <Text style={styles.difficulty}>{recette.difficulte}</Text>
        <Text style={styles.time}>{recette.temps_preparation}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  difficulty: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#888888",
  },
});
export default RecipeCard;
