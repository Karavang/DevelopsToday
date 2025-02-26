import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InputByCountry from "../components/InputByCountry";
import InputByIng from "../components/InputByIng";
import InputByCategory from "../components/InputByCategory";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  [key: string]: any;
}

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("filterValue");
  const filterType = searchParams.get("filterType");

  useEffect(() => {
    let url = "http://localhost:4444/recipes";
    if (filterValue && filterType) {
      url += `?filterType=${filterType}&filterValue=${filterValue}`;
    }
    axios
      .get(url)
      .then((response) => {
        setRecipes(response.data.meals);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch recipes");
      });
  }, [filterValue, filterType]);

  return (
    <div>
      <InputByCountry />
      <InputByIng />
      <InputByCategory />
      <h1>
        {filterValue
          ? `Recipes filtered by ${filterType}: ${filterValue}`
          : "All Recipes"}
      </h1>
      {error && <p>{error}</p>}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link to={`/recipes/${recipe.idMeal}`}>{recipe.strMeal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListPage;
