import { useLoaderData, Link } from "react-router-dom"
import { editRecipe } from "../actions/recipe.actions";
import RecipeForm from "../components/RecipeForm";

const EditRecipePage = () => {
  const recipe = useLoaderData();

  return (
    <>
      <Link to="/">Back to Recipes</Link>
      <RecipeForm recipe={recipe} recipeFunction={editRecipe}/>
    </>
  )
}

export default EditRecipePage