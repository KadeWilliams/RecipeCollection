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

export { deleteRecipe }