const deleteRecipe = async (previousState, formData) => {
  const confirm = window.confirm("Are you sure you want to delete this recipe?");
  if (!confirm) {
    return { success: false, message: 'Recipe deletion cancelled' };
  }
  const id = formData.get("id")

  try {
    const _res = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    })

    return {success: true, message: 'successfully deleted the recipe'};

  } catch (e) {

    const message = 'Error occurred while deleting recipe';
    console.error(message, e)

    return {success: false, message: message};
  }
};

const editRecipe = async (previousState, recipeData) => {
  try {
    const res = await fetch(`/api/recipes/${recipeData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData)
    })

    if (!res.ok) throw new Error('Failed to update recipe');

    return { success: true, message: 'Successfully updated recipe'};
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Error occurred updating the recipe'};
  }
};

const addRecipe = async (previousState, recipeData) => {
  try {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })

    if (!res.ok) throw new Error('Failed to add new recipe');

    return { success: true, message: 'Successfully added recipe'};
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Error occurred adding the recipe'};
  }
}

export { deleteRecipe, editRecipe, addRecipe }