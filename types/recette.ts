export interface Recette {
    id: number;
    titre: string;
    temps_preparation: string;
    difficulte: string;
    image: string;
    ingredients: string[];
    etapes_preparation?: string[];
}