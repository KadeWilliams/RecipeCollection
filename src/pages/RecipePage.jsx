import { useActionState, useEffect } from "react";
import { deleteRecipe } from "../actions/recipe.actions";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";

const RecipePage = () => {
  const {id} = useParams();
  const recipe = useLoaderData();
  const navigate = useNavigate();

  const [state, formAction] = useActionState(deleteRecipe, {
    success: false,
    message: '',
  })

  useEffect(() => {
    if (state.success) {
      if (state.message) {
        console.log(state.message);
      }
      navigate('/')
    } else {
      if (state.message) {
        console.error(state.message);
      }
    }
  }, [state, navigate])



  return (
    <>
      <form action={formAction}>
        <input 
          value={recipe.id}
          hidden 
          id="id"
          name="id"
          readOnly
        />
        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
        >
          Delete recipe 
        </button>
      </form>
    </>
  )
}

const recipeLoader = async ({params}) => {
  const res = await fetch(`/api/recipes/${params.id}`);
  const data = await res.json();
  return data;
};

export { RecipePage as default, recipeLoader }