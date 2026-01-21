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

const editRecipe = async (previousState, formData) => {
  const fields = {
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    link: formData.get('link'),
    cookbook: formData.get('cookbook'),
    cookbookImage: formData.get('cookbookImageUrl'),
    page: formData.get('page'),
    recipeImageUrl: formData.get('recipeImageUrl'),
    isFavorite: formData.get('isFavorite'),
    cooked: formData.get('cooked'),
    dateCooked: formData.get('dateCooked'),
    meal: formData.get('meal'),
    season: formData.get('season'),
    chef: formData.get('chef'),
    ingredients: [
      {
        ingredientName: formData.get('ingredientName'),
        amount: formData.get('amount'),
        unit: formData.get('unit'),
        isOptional: formData.get('isOptional'),
        note: formData.get('note'),
      }
    ]
  } 
  try {
    console.log(fields)
    // const _res = await fetch(`/api/recipes/${fields.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(fields),
    // });
  } catch (e) {
    console.error(e);
    return {success: false, message: 'Error occurred updating recipe'}
  }

  return {success: false, message: 'recipe updated'}
}

export { deleteRecipe, editRecipe }