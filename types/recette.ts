export interface Recette {
    id: number;
    title: string;
    cover: string;
    ingredients: string[];
    instructions?: string;
}