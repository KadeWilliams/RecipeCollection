import { useLoaderData, useParams } from "react-router-dom"
import { useState, useEffect, useActionState } from "react";
import { editRecipe } from "../actions/recipe.actions";

const EditRecipePage = () => {
  const recipe = useLoaderData();
  const [recipeData, setRecipeData] = useState(recipe);
  const {id} = useParams();

  const [state, formAction] = useActionState(editRecipe, {
    success: false, 
    message: ''
  });


  useEffect(() => {
    console.log(state.message)
  }, [state]);

  const handleIngredientChange = (index, field, value) => {
    // setRecipeData(prev => ({
    //   ...prev,
    //   ingredients: prev.ingredients.map
    // }));
    const newIngredients = recipeData.ingredients.map((ing, i) => {
      if (i === index) {
        return { ...ing, [field]: value};
      }
      return ing;
    });

    setRecipeData({...recipeData, ingredients: newIngredients});
  };


  return (
    <>
      <form action={formAction} style={{display: 'flex', flexDirection: 'column'}}>
        <input 
          value={recipeData.id}
          hidden
          name='id'
        />
        <input 
          type='text'
          value={recipeData.title}
          name='title'
          onChange={(e) => {setRecipeData(prev => ({...prev, title: e.target.value}))}}
        />
        <textarea 
          type='text'
          value={recipeData.description}
          name='description'
          onChange={(e) => {setRecipeData(prev => ({...prev, description: e.target.value}))}}
        />
        <input 
          type='text'
          value={recipeData.link}
          name='link'
          onChange={(e) => {setRecipeData(prev => ({...prev, link: e.target.value}))}}
        />
        <input 
          type='text'
          value={recipeData.cookbook}
          name='cookbook'
          onChange={(e) => {setRecipeData(prev => ({...prev, cookbook: e.target.value}))}}
          placeholder='Cookbook?'
        />
        {
          recipeData.cookbook 
          ? 
          (
            <>
              <input 
                type='text'
                value={recipeData.cookbookImage}
                name='cookbookImageUrl'
                onChange={(e) => {setRecipeData(prev => ({...prev, cookbookImageUrl: e.target.value}))}}
              />
              <input 
                type='number'
                name='page'
                value={recipeData.page}
                onChange={(e) => {setRecipeData(prev => ({...prev, page: e.target.value}))}}
              />
            </>
          )
          : ''
        }
        <input 
          type='text'
          name='recipeImageUrl'
          value={recipeData.recipeImageUrl}
          onChange={(e) => {setRecipeData(prev => ({...prev, recipeImageUrl: e.target.value}))}}
        />
        {/* TODO: make these a 'switcher' in post v1 */}
        {/* "isFavorite": true,
        "cooked": true, */}
        <input 
          type='checkbox'
          name='isFavorite'
          value={recipeData.isFavorite}
          onChange={(e) => {setRecipeData(prev => ({...prev, isFavorite: e.target.value}))}}
        />
        <input 
          type='checkbox'
          name='cooked'
          value={recipeData.cooked}
          onChange={(e) => {setRecipeData(prev => ({...prev, cooked: e.target.value}))}}
        />
        <input 
          type='date'
          name='dateCooked'
          value={recipeData.dateCooked}
          onChange={(e) => {setRecipeData(prev => ({...prev, dateCooked: e.target.value}))}}
        />

      {/* TODO?: make an enum? */}
        <select 
          name='meal'
          value={[recipeData.meal]}
          onChange={(e) => {setRecipeData(prev => ({...prev, meal: e.target.value}))}}
          multiple
        >
          <option>dinner</option>
          <option>lunch</option>
          <option>breakfast</option>
          <option>snack</option>
          <option>condiment</option>
          <option>dessert</option>
        </select>
      {/* TODO?: make an enum? */}
        <select
          type='text'
          name='season'
          value={[recipeData.season]}
          onChange={(e) => {setRecipeData(prev => ({...prev, dishType: e.target.value}))}}
          multiple
        >
          <option>summer</option>
          <option>fall</option>
          <option>winter</option>
          <option>spring</option>
        </select>
        <input 
          type='text'
          name='chef'
          value={recipeData.chef}
          onChange={(e) => {setRecipeData(prev => ({...prev, chef: e.target.value}))}}
        />
        <div>
          { recipeData.ingredients.map((ing, index) => (
            <div key={index}> 
              <input
                type='number'
                value={ing.amount}
                name={`amount_${index}`}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                placeholder='Amount'
              />
              <input
                type='text'
                value={ing.ingredientName}
                name={`ingredientName_${index}`}
                onChange={(e) => handleIngredientChange(index, 'ingredientName', e.target.value)}
                placeholder='Ingredient'
              />
              <input
                type='text'
                value={ing.unit}
                name={`unit_${index}`}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                placeholder='Unit'
              />
              <input
                type='checkbox'
                value={ing.isOptional}
                name={`isOptional_${index}`}
                onChange={(e) => handleIngredientChange(index, 'isOptional', e.target.value)}
              />
              <textarea
                type='text'
                value={ing.note}
                name={`note_${index}`}
                onChange={(e) => handleIngredientChange(index, 'note', e.target.value)}
                placeholder='Notes'
              />
            </div>
          ))}
        </div>
      {/* TODO: make a separate form for ingredients */}
      {/* "ingredients": [
        {
          "ingredientName": "salmon",
          "amount": 24,
          "unit": "ounces",
          "isOptional": false,
          "note": null
        },
        {
          "ingredientName": "salt",
          "amount": "taste",
          "unit": null,
          "isOptional": false,
          "note": null
        },
        {
          "ingredientName": "pepper",
          "amount": "taste",
          "unit": null,
          "isOptional": false,
          "note": null
        },
        {
          "ingredientName": "greek yogurt",
          "amount": 60,
          "unit": "grams",
          "isOptional": false,
          "note": null
        },
        {
          "ingredientName": "harissa paste",
          "amount": 35,
          "unit": "grams",
          "isOptional": true,
          "note": "Couldn't really taste it; felt like it didn't need it."
        },
        {
          "ingredientName": "bread crumbs",
          "amount": 80,
          "unit": "grams",
          "isOptional": false,
          "note": null
        },
        {
          "ingredientName": "flaky salt",
          "amount": 80,
          "unit": "grams",
          "isOptional": true,
          "note": null
        },
        {
          "ingredientName": "spray oil",
          "amount": "as needed",
          "unit": null,
          "isOptional": false,
          "note": null
        } 
       ], */}
      {/* "steps": [
        "Position a rack to the center of the oven and preheat to 425°F convection.",
        "Season both sides of the salmon with kosher salt and black pepper.",
        "Slice the salmon into 1-inch cubes.",
        "Add the salmon pieces to a large bowl, add in 1/4 cup of greek yogurt and 2 tablespoons mild harissa paste. Mix well so that the salmon is fully coated. See Note.",
        "In a small dish to the side, add the 2/3 cup of almond flour and season with 1/2 teaspoon flaky salt. Toss to break up any clumps.",
        "Prepare a parchment-lined baking sheet to the side. Take each salmon nugget and lightly toss it in the almond flour to get it coated on all sides. Add these to the baking sheet. If your salmon has skin on it, make sure you place these skin-side-down.",
        "Lightly spray the nuggets with spray avocado oil. This is optional, but will help them get some color.",
        "Bake at 425°F for 20-22 minutes or until golden and crisp on the bottoms.",
        "Serve warm!"
      ] */}
        <button>Save</button>
      </form>
    </>
  )
}

export default EditRecipePage