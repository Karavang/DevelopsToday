import { Router } from 'express';
import { getRecipesList, getRecipeDetails, startListsData } from '../controllers/recipeController';

const router = Router();

router.get('/recipes', getRecipesList);
router.get('/recipes/:id', (req, res, next) => {
  getRecipeDetails(req, res).catch(next);
});
router.get('/listData', startListsData);

export default router;
