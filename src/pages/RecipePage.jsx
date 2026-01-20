import { useActionState, useEffect } from "react";
import { deleteRecipe } from "../actions/recipe.actions";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";

const RecipePage = () => {
  const {id} = useParams();
  const recipe = useLoaderData();
  const navigate = useNavigate();

  const [state, formAction] = useActionState(deleteRecipe, {
    success: true,
    message: '',
  })

  useEffect(() => {
    if (state.success) {
      if (state.message) {
        console.log(state.message);
      }
      navigate('/recipes')
    } else {
      if (state.message) {
        console.error(state.message);
      }
    }
  }, [state, navigate])



  return (
    <div>{recipe.title}</div>
  )
}

const recipeLoader = async ({params}) => {
  const res = await fetch(`api/recipes/${params.id}`);
  const data = await res.json();
  return data;
};

export { RecipePage as default, recipeLoader }