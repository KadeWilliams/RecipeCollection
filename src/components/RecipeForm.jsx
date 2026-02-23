/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";



const RecipeForm = ({recipeFunction, recipe }) => {
  const [recipeData, setRecipeData] = useState(recipe);
  console.log(recipe);
  const navigate = useNavigate();
  const [state, _formAction, _isPending] = useActionState(recipeFunction, {
    success: false, 
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await recipeFunction(state, recipeData);
    console.log(recipeData);
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

  const handleStepChange = (index, value) => {
  setRecipeData(prev => {

    //flatten old steps into newSteps
    const newSteps = [...prev.steps];

    // set the index of the step you're updating to the input value 
    newSteps[index] = value;

    // return the new recipeData object to set the recipeData 
    return { ...prev, steps: newSteps }
  })
  }
   
  const addStep = () => {
    setRecipeData(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        ''
      ]
    }))

  }

  const removeStep = (index) => { 
    setRecipeData(prev => ({
      ...prev, 
      steps: prev.steps.filter((_, i) => i !== index),
    }))
  };

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
          TODO: make these a 'switcher' in post v1 
         "isFavorite": true,
         "cooked": true,
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

         <select 
           value={recipeData.meals}
           onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => option.value)
              setRecipeData(prev => ({...prev, meals:  selectedValues})
            )}}
           multiple
         >
           <option>dinner</option>
           <option>lunch</option>
           <option>breakfast</option>
           <option>snack</option>
           <option>condiment</option>
           <option>dessert</option>
         </select>
         <select
           type='text'
           value={recipeData.seasons}
           //onChange={(e) => {setRecipeData(prev => ({...prev, seasons: [...prev.season, e.target.value]}))}}
           onChange={(e) => {
            const selectedValues = Array.from(e.target.selectedOptions, option => option.value)
              setRecipeData(prev => ({...prev, seasons:  selectedValues})
            )}}
           multiple
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
            >Add Ingredient</button>
         </div>
         <div>
           { recipeData.steps.map((step, index) => (
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
           ))}
            <button
            type="button"
            onClick={addStep}
            >Add Step</button> 
         </div>
         <button type="submit">Save</button>
       </form>
    </>
  )
}

export default RecipeForm
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import "../styles/RecipeForm.css";

const TABS = ["BASICS", "DETAILS", "INGREDIENTS", "STEPS"];

const RecipeForm = ({ recipeFunction, recipe }) => {
  const [recipeData, setRecipeData] = useState(recipe);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [state, _formAction, _isPending] = useActionState(recipeFunction, {
    success: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await recipeFunction(state, recipeData);
    if (result.success) navigate("/");
  };

  const set = (field, value) =>
    setRecipeData((prev) => ({ ...prev, [field]: value }));

  /* Ingredients */
  const handleIngredientChange = (index, field, value) => {
    setRecipeData((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = { ...newIngredients[index], [field]: value };
      return { ...prev, ingredients: newIngredients };
    });
  };
  const addIngredient = () =>
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          ingredientName: "",
          amount: 0,
          unit: "",
          isOptional: false,
          note: "",
        },
      ],
    }));
  const removeIngredient = (index) =>
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));

  /* Steps */
  const handleStepChange = (index, value) => {
    setRecipeData((prev) => {
      const newSteps = [...prev.steps];
      newSteps[index] = value;
      return { ...prev, steps: newSteps };
    });
  };
  const addStep = () =>
    setRecipeData((prev) => ({ ...prev, steps: [...prev.steps, ""] }));
  const removeStep = (index) =>
    setRecipeData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  const moveStep = (index, dir) => {
    setRecipeData((prev) => {
      const steps = [...prev.steps];
      const target = index + dir;
      if (target < 0 || target >= steps.length) return prev;
      [steps[index], steps[target]] = [steps[target], steps[index]];
      return { ...prev, steps };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      {recipeData.id != 0 && <input value={recipeData.id} hidden readOnly />}
      {/* Tab Nav */}
      <div className="form-tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`form-tab ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            <span className="tab-num">0{i + 1}</span>
            {tab}
          </button>
        ))}
      </div>

      {/* ── BASICS ── */}
      {activeTab === 0 && (
        <div className="form-section">
          <div className="section-label">// RECIPE BASICS</div>

          <div className="form-group">
            <label className="form-label">TITLE *</label>
            <input
              className="form-input form-input--large"
              type="text"
              value={recipeData.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="RECIPE TITLE"
            />
          </div>

          <div className="form-group">
            <label className="form-label">DESCRIPTION</label>
            <textarea
              className="form-input form-textarea"
              value={recipeData.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="DESCRIBE THE DISH..."
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">CHEF / AUTHOR</label>
              <input
                className="form-input"
                type="text"
                value={recipeData.chef}
                onChange={(e) => set("chef", e.target.value)}
                placeholder="WHO MADE THIS?"
              />
            </div>
            <div className="form-group">
              <label className="form-label">SOURCE LINK</label>
              <input
                className="form-input"
                type="text"
                value={recipeData.link}
                onChange={(e) => set("link", e.target.value)}
                placeholder="HTTPS://..."
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">RECIPE IMAGE URL</label>
            <input
              className="form-input"
              type="text"
              value={recipeData.recipeImageUrl}
              onChange={(e) => set("recipeImageUrl", e.target.value)}
              placeholder="HTTPS://IMAGE-URL..."
            />
            {recipeData.recipeImageUrl && (
              <div className="image-preview">
                <img src={recipeData.recipeImageUrl} alt="preview" />
                <span className="preview-label">PREVIEW</span>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-toggle">
              <input
                type="checkbox"
                checked={recipeData.isFavorite}
                onChange={(e) => set("isFavorite", e.target.checked)}
              />
              <span className="toggle-box"></span>
              <span className="toggle-label">★ FAVORITE</span>
            </label>
            <label className="form-toggle">
              <input
                type="checkbox"
                checked={recipeData.cooked}
                onChange={(e) => set("cooked", e.target.checked)}
              />
              <span className="toggle-box"></span>
              <span className="toggle-label">✓ COOKED</span>
            </label>
          </div>

          {recipeData.cooked && (
            <div className="form-group">
              <label className="form-label">DATE COOKED</label>
              <input
                className="form-input"
                type="date"
                value={recipeData.dateCooked}
                onChange={(e) => set("dateCooked", e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      {/* ── DETAILS ── */}
      {activeTab === 1 && (
        <div className="form-section">
          <div className="section-label">// MEAL + SEASON TAGS</div>

          <div className="form-row form-row--multi">
            <div className="form-group">
              <label className="form-label">MEAL TYPE</label>
              <div className="chip-group">
                {[
                  "dinner",
                  "lunch",
                  "breakfast",
                  "snack",
                  "condiment",
                  "dessert",
                ].map((meal) => {
                  const active = recipeData.meals?.includes(meal);
                  return (
                    <button
                      key={meal}
                      type="button"
                      className={`chip ${active ? "chip--active" : ""}`}
                      onClick={() => {
                        const meals = active
                          ? recipeData.meals.filter((m) => m !== meal)
                          : [...(recipeData.meals || []), meal];
                        set("meals", meals);
                      }}
                    >
                      {meal.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">SEASON</label>
              <div className="chip-group">
                {["spring", "summer", "fall", "winter"].map((season) => {
                  const active = recipeData.seasons?.includes(season);
                  return (
                    <button
                      key={season}
                      type="button"
                      className={`chip chip--season ${active ? "chip--active" : ""}`}
                      onClick={() => {
                        const seasons = active
                          ? recipeData.seasons.filter((s) => s !== season)
                          : [...(recipeData.seasons || []), season];
                        set("seasons", seasons);
                      }}
                    >
                      {season.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="section-label" style={{ marginTop: "2rem" }}>
            // COOKBOOK INFO
          </div>

          <div className="form-group">
            <label className="form-label">COOKBOOK NAME</label>
            <input
              className="form-input"
              type="text"
              value={recipeData.cookbook}
              onChange={(e) => set("cookbook", e.target.value)}
              placeholder="BOOK TITLE (IF FROM A BOOK)"
            />
          </div>

          {recipeData.cookbook && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">COOKBOOK IMAGE URL</label>
                <input
                  className="form-input"
                  type="text"
                  value={recipeData.cookbookImageUrl}
                  onChange={(e) => set("cookbookImageUrl", e.target.value)}
                  placeholder="COVER IMAGE URL"
                />
              </div>
              <div className="form-group form-group--sm">
                <label className="form-label">PAGE #</label>
                <input
                  className="form-input"
                  type="number"
                  value={recipeData.page}
                  onChange={(e) => set("page", e.target.value)}
                  placeholder="42"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── INGREDIENTS ── */}
      {activeTab === 2 && (
        <div className="form-section">
          <div className="section-label">
            // INGREDIENTS
            <span className="section-count">
              {recipeData.ingredients.length} ITEMS
            </span>
          </div>

          <div className="ingredients-table">
            <div className="ing-header">
              <span>AMT</span>
              <span>INGREDIENT</span>
              <span>UNIT</span>
              <span>OPT?</span>
              <span>NOTES</span>
              <span></span>
            </div>

            {recipeData.ingredients.map((ing, index) => (
              <div key={index} className="ing-row">
                <input
                  className="form-input ing-input"
                  type="number"
                  value={ing.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  placeholder="0"
                />
                <input
                  className="form-input ing-input"
                  type="text"
                  value={ing.ingredientName}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      "ingredientName",
                      e.target.value,
                    )
                  }
                  placeholder="INGREDIENT NAME"
                />
                <input
                  className="form-input ing-input"
                  type="text"
                  value={ing.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                  placeholder="G / OZ / CUP"
                />
                <label className="ing-optional">
                  <input
                    type="checkbox"
                    checked={ing.isOptional}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "isOptional",
                        e.target.checked,
                      )
                    }
                  />
                  <span className="toggle-box toggle-box--sm"></span>
                </label>
                <input
                  className="form-input ing-input"
                  type="text"
                  value={ing.note}
                  onChange={(e) =>
                    handleIngredientChange(index, "note", e.target.value)
                  }
                  placeholder="ANY NOTES..."
                />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeIngredient(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="btn-add" onClick={addIngredient}>
            + ADD INGREDIENT
          </button>
        </div>
      )}

      {/* ── STEPS ── */}
      {activeTab === 3 && (
        <div className="form-section">
          <div className="section-label">
            // STEPS
            <span className="section-count">
              {recipeData.steps.length} STEPS
            </span>
          </div>

          <div className="steps-list">
            {recipeData.steps.map((step, index) => (
              <div key={index} className="step-row">
                <div className="step-num">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <textarea
                  className="form-input form-textarea step-input"
                  value={step}
                  placeholder={`STEP ${index + 1}...`}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  rows={2}
                />
                <div className="step-controls">
                  <button
                    type="button"
                    className="step-move"
                    onClick={() => moveStep(index, -1)}
                    disabled={index === 0}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    className="step-move"
                    onClick={() => moveStep(index, 1)}
                    disabled={index === recipeData.steps.length - 1}
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeStep(index)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="btn-add" onClick={addStep}>
            + ADD STEP
          </button>
        </div>
      )}

      {/* Footer CTA */}
      <div className="form-footer">
        <div className="footer-nav">
          {activeTab > 0 && (
            <button
              type="button"
              className="btn-nav"
              onClick={() => setActiveTab((t) => t - 1)}
            >
              ← PREV
            </button>
          )}
          {activeTab < TABS.length - 1 && (
            <button
              type="button"
              className="btn-nav btn-nav--next"
              onClick={() => setActiveTab((t) => t + 1)}
            >
              NEXT →
            </button>
          )}
        </div>
        <button type="submit" className="btn-save">
          ★ SAVE RECIPE
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
