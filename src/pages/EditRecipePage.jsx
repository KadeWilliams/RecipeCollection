import { useLoaderData, Link } from "react-router-dom";
import { editRecipe } from "../actions/recipe.actions";
import RecipeForm from "../components/RecipeForm";
import "../styles/FormPage.css";

const EditRecipePage = () => {
  const recipe = useLoaderData();

  return (
    <div className="form-page">
      <div className="form-page-header">
        <Link to="/" className="back-link">
          ← BACK TO INDEX
        </Link>
        <div className="page-eyebrow">EDITING RECIPE</div>
        <h1 className="page-title">{recipe.title || "UNTITLED"}</h1>
      </div>
      <RecipeForm recipe={recipe} recipeFunction={editRecipe} />
    </div>
  );
};

export default EditRecipePage;
