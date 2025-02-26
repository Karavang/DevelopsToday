import axios from 'axios';
import { Recipe, RecipeList } from '../interfaces/Recipe';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.THEMEALDB;

export const getRecipes = async (
  filterType?: string,
  filterValue?: string,
): Promise<RecipeList> => {
  try {
    let endpoint = `${API_URL}/search.php?s=`;

    if (filterType && filterValue) {
      if (filterType === 'ingredient') {
        endpoint = `${API_URL}/filter.php?i=${filterValue}`;
      } else if (filterType === 'country') {
        endpoint = `${API_URL}/filter.php?a=${filterValue}`;
      } else if (filterType === 'category') {
        endpoint = `${API_URL}/filter.php?c=${filterValue}`;
      }
    }

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { meals: null };
  }
};

export const getRecipeById = async (id: Number): Promise<Recipe | null> => {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    if (response.data.meals && response.data.meals.length > 0) {
      return response.data.meals[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};
export const getListsData = async (): Promise<any> => {
  const categoriesData: Array<any> = (await axios.get(`${API_URL}/list.php?c=list`)).data.meals;
  const areasData: Array<any> = (await axios.get(`${API_URL}/list.php?a=list`)).data.meals;
  const ingredientsData: Array<any> = (await axios.get(`${API_URL}/list.php?i=list`)).data.meals;

  return { categories: categoriesData, areas: areasData, ingredients: ingredientsData };
};
