import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RecipeListScreen from './screens/RecipeListScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import { RootStackParamList } from './types/navigation';

// ✅ Créer un Stack Navigator typé
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      {/* ✅ NAVIGATION CONTAINER (TP3) */}
      {/* C'est le wrapper principal pour toute la navigation */}
      <NavigationContainer>
        {/* ✅ STACK NAVIGATOR (TP3) */}
        {/* Gère les transitions entre écrans */}
        <Stack.Navigator
          initialRouteName="RecipeList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#1A1A2E',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          {/* ✅ ÉCRAN 1 : RecipeListScreen */}
          {/* Sans header (personnalisé dans l'écran) */}
          <Stack.Screen
            name="RecipeList"
            component={RecipeListScreen}
            options={{
              headerShown: false,
            }}
          />

          {/* ✅ ÉCRAN 2 : RecipeDetailScreen */}
          {/* Header auto avec le titre de la recette */}
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={({ route }) => ({
              title: route.params.recette.titre,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
