import { Recette } from './recette';

export type RootStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recette: Recette };
};
