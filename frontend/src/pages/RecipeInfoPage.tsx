import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "./RecipeListPage";
import BackButton from "../components/BackButton";

const RecipeInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4444/recipes/${id}`)
        .then((response) => {
          setRecipe(response.data.meals[0]);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch recipe details");
        });
    }
  }, [id]);

  useEffect(() => {
    if (recipe && recipe.strCategory) {
      axios
        .get(
          `http://localhost:4444/recipes?filterType=category&filterValue=${recipe.strCategory}`,
        )
        .then((response) => {
          setRelatedRecipes(response.data.meals);
        })
        .catch((err) => {
          console.error(err);
          // Не обязательная ошибка
        });
    }
  }, [recipe]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  // Собираем список ингредиентов
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="recipePage">
      <BackButton />
      <div className="recipe">
        <div>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
          <div>
            <h1>{recipe.strMeal}</h1>
            <Link
              to={`/recipes?type=country&filter=${encodeURIComponent(
                recipe.strArea,
              )}`}
            >
              <h3>{recipe.strArea}</h3>
            </Link>
          </div>
        </div>
        <div>
          <p>{recipe.strInstructions}</p>
        </div>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/recipes?type=ingredient&filter=${encodeURIComponent(
                    item.ingredient,
                  )}`}
                >
                  {item.ingredient} - {item.measure}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right-list">
        <h2>More in {recipe.strCategory}</h2>
        <ul>
          {relatedRecipes.map((item) => (
            <li key={item.idMeal}>
              <Link to={`/recipes/${item.idMeal}`}>{item.strMeal}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeInfoPage;
