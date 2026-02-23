/*
import RecipeForm from "../components/RecipeForm"
import { addRecipe } from "../actions/recipe.actions"

const AddRecipePage = () => {
  const EMPTY_RECIPE = {
      title: "",
      description: "",
      link: "",
      cookbook: "",
      cookbookImageUrl: "",
      page: "",
      recipeImageUrl: "",
      isFavorite: true,
      cooked: true,
      dateCooked: "",
      meals: [""],
      seasons: [""],
      chef: "",
      ingredients: [
        {
          ingredientName: "",
          amount: 0,
          unit: "",
          isOptional: false,
          note: "" 
        },
      ],
      steps: [
        "",
      ]
  }
  return (
    <>
      <div>AddRecipePage</div>
      <RecipeForm recipeFunction={addRecipe} recipe={EMPTY_RECIPE}/>
    </>
  )
}

export default AddRecipePage
*/

import RecipeForm from "../components/RecipeForm";
import { addRecipe } from "../actions/recipe.actions";
import { Link } from "react-router-dom";
import "../styles/FormPage.css";

const EMPTY_RECIPE = {
  title: "",
  description: "",
  link: "",
  cookbook: "",
  cookbookImageUrl: "",
  page: "",
  recipeImageUrl: "",
  isFavorite: false,
  cooked: false,
  dateCooked: "",
  meals: [],
  seasons: [],
  chef: "",
  ingredients: [
    { ingredientName: "", amount: 0, unit: "", isOptional: false, note: "" },
  ],
  steps: [""],
};

const AddRecipePage = () => {
  return (
    <div className="form-page">
      <div className="form-page-header">
        <Link to="/" className="back-link">
          ← BACK TO INDEX
        </Link>
        <div className="page-eyebrow">NEW ENTRY</div>
        <h1 className="page-title">
          ADD A<br />
          RECIPE
        </h1>
      </div>
      <RecipeForm recipeFunction={addRecipe} recipe={EMPTY_RECIPE} />
    </div>
  );
};

export default AddRecipePage;
