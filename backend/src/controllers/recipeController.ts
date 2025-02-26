import { Request, Response } from 'express';
import { getListsData, getRecipeById, getRecipes } from '../services/recipeService';

export const getRecipesList = async (req: Request, res: Response) => {
  try {
    const { filterType, filterValue } = req.query;
    const recipes = await getRecipes(filterType as string, filterValue as string);
    res.json(recipes);
  } catch (error) {
    console.error('Controller error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export const getRecipeDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(Number(id));

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ meals: [recipe] });
  } catch (error) {
    console.error('Controller error fetching recipe details:', error);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
};
export const startListsData = async (req: Request, res: Response) => {
  res.json(await getListsData());
};
