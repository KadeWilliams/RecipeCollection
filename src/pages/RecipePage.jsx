const RecipePage = () => {
  return (
    <div>RecipePage</div>
  )
}

const recipeLoader = async ({params}) => {
  // const res = await fetch(`/api/recipe/${params.id}`);
  // const data = await res.json();
  // return data;
};

// eslint-disable-next-line react-refresh/only-export-components
export {RecipePage as default, recipeLoader};