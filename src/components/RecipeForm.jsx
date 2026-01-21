import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";



const RecipeForm = ({recipeFunction, recipe }) => {
  const [recipeData, setRecipeData] = useState(recipe);
  const navigate = useNavigate();
  const [state, _formAction, _isPending] = useActionState(recipeFunction, {
    success: false, 
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await recipeFunction(state, recipeData);

    if (result.success) {
      navigate("/")
    }
  };

  const handleIngredientChange = (index, field, value) => {
    setRecipeData(prev => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value,
      };
      return { ...prev, ingredients: newIngredients };
    })
  };


  const addIngredient = () => {
    setRecipeData(prev => ({
      ...prev, 
      ingredients: [
        ...prev.ingredients,
        {
          ingredientName: "",
          amount: 0,
          unit: "",
          isOptional: false,
          note: "" 
        },
      ]
    }));
  };

  const removeIngredient = (index) => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i!==index),
    }))
  };

  // const handleStepChange = (index, value) => {
  //   setRecipeData(prev => {
  //     const newStep = [...prev.steps];
  //     newStep[index] = [
  //       ...newStep[index],
  //       value
  //     ]
  //     return {...prev, steps: newStep}
  //   })
  // }
  // const addStep = () => {
  //   setRecipeData(prev => {
  //     console.log(prev.steps);
  //   })
  //   // setRecipeData(prev => ({
  //   //   ...prev, 
  //   //   steps:[
  //   //     ...prev.steps,
  //   //   ],
  //   // }))
  // };
  // const removeStep = (index) => { 
  //   // console.log(index,'removing step')
  //   setRecipeData(prev => ({
  //     ...prev, 
  //     steps: prev.steps.filter((_, i) => i !== index),
  //   }))
  // };

  return (
    <>
    <div>RecipeForm</div>
       <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        {
          recipeData.id != 0 ? <input value={recipeData.id} hidden /> : ''
        }
         <input 
           type='text'
           value={recipeData.title}
           onChange={(e) => {setRecipeData(prev => ({...prev, title: e.target.value}))}}
         />
         <textarea 
           type='text'
           value={recipeData.description}
           onChange={(e) => {setRecipeData(prev => ({...prev, description: e.target.value}))}}
         />
         <input 
           type='text'
           value={recipeData.link}
           onChange={(e) => {setRecipeData(prev => ({...prev, link: e.target.value}))}}
         />
         <input 
           type='text'
           value={recipeData.cookbook}
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
                 onChange={(e) => {setRecipeData(prev => ({...prev, cookbookImageUrl: e.target.value}))}}
               />
               <input 
                 type='number'
                 value={recipeData.page}
                 onChange={(e) => {setRecipeData(prev => ({...prev, page: e.target.value}))}}
               />
             </>
           )
           : ''
         }
         <input 
           type='text'
           value={recipeData.recipeImageUrl}
           onChange={(e) => {setRecipeData(prev => ({...prev, recipeImageUrl: e.target.value}))}}
         />
         {/* TODO: make these a 'switcher' in post v1 */}
         {/* "isFavorite": true,
         "cooked": true, */}
         <input 
           type='checkbox'
           value={recipeData.isFavorite}
           onChange={(e) => {setRecipeData(prev => ({...prev, isFavorite: e.target.value}))}}
         />
         <input 
           type='checkbox'
           value={recipeData.cooked}
           onChange={(e) => {setRecipeData(prev => ({...prev, cooked: e.target.value}))}}
         />
         <input 
           type='date'
           value={recipeData.dateCooked}
           onChange={(e) => {setRecipeData(prev => ({...prev, dateCooked: e.target.value}))}}
         />

       {/* TODO?: make an enum? */}
         <select 
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
           value={[recipeData.season]}
           onChange={(e) => {setRecipeData(prev => ({...prev, season: e.target.value}))}}
           multiple={true}
         >
           <option>summer</option>
           <option>fall</option>
           <option>winter</option>
           <option>spring</option>
         </select>
         <input 
           type='text'
           value={recipeData.chef}
           onChange={(e) => {setRecipeData(prev => ({...prev, chef: e.target.value}))}}
         />
         <div>
           { recipeData.ingredients.map((ing, index) => (
             <div key={index}> 
               <input
                 type='number'
                 value={ing.amount}
                 onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                 placeholder='Amount'
               />
               <input
                 type='text'
                 value={ing.ingredientName}
                 onChange={(e) => handleIngredientChange(index, 'ingredientName', e.target.value)}
                 placeholder='Ingredient'
               />
               <input
                 type='text'
                 value={ing.unit}
                 onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                 placeholder='Unit'
               />
               <input
                 type='checkbox'
                 value={ing.isOptional}
                 onChange={(e) => handleIngredientChange(index, 'isOptional', e.target.value)}
               />
               <textarea
                 type='text'
                 value={ing.note}
                 onChange={(e) => handleIngredientChange(index, 'note', e.target.value)}
                 placeholder='Notes'
               />
               <button
                type="button"
                onClick={() => removeIngredient(index)}
               >Remove</button>
             </div>
           ))}
            <button
            type="button"
            onClick={addIngredient}
            >Add</button>
         </div>
         <div>
           {/* { recipeData.steps.map((step, index) => (
             <div key={index}> 
               <input
                 type='text'
                 value={step}
                 placeholder='Step'
                 onChange={(e) => handleStepChange(index, e.target.value)}
               />
               <button
                type="button"
                onClick={() => removeStep(index)}
               >Remove</button>
             </div>
           ))}*/}
            <button
            type="button"
            // onClick={addStep}
            >Add</button> 
         </div>
         <button type="submit">Save</button>
       </form>
    </>
  )
}

export default RecipeForm