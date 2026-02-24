const deleteRecipe = async (previousState, formData) => {
  const confirm = window.confirm(
    "Are you sure you want to delete this recipe?",
  );
  if (!confirm) {
    return { success: false, message: "Recipe deletion cancelled" };
  }
  const id = formData.get("id");

  try {
    const _res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    return { success: true, message: "successfully deleted the recipe" };
  } catch (e) {
    const message = "Error occurred while deleting recipe";
    console.error(message, e);

    return { success: false, message: message };
  }
};

const editRecipe = async (previousState, recipeData) => {
  try {
    console.log(recipeData);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!res.ok) throw new Error("Failed to update recipe");

    return { success: true, message: "Successfully updated recipe" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Error occurred updating the recipe" };
  }
};

const addRecipe = async (previousState, recipeData) => {
  try {
    console.log(recipeData);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData, booleanReplacer),
    });

    if (!res.ok) throw new Error("Failed to add new recipe");

    return { success: true, message: "Successfully added recipe" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Error occurred adding the recipe" };
  }
};

function booleanReplacer(key, value) {
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    } else if (value.toLowerCase() === "false") {
      return false;
    }
  }
  return value;
}

export { deleteRecipe, editRecipe, addRecipe };
