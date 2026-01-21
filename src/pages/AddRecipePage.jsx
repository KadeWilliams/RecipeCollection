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
      meal: [""],
      season: [""],
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