import React from 'react'
import data from '../data.json';
import Recipes from '../components/Recipes';
import CookedRecipes from '../components/CookedRecipes';

// TODO: Implement the "Cooked Recipes Component"
// Might want to have a section to show all of that. Probably beyond the scope of what I want to do right now

const HomePage = () => {
  const cookbook = data[0].cookbook;
  return (
    // some element at the top
    <>
        <Recipes title={cookbook.title} recipes={cookbook.recipes}/>
        {/* <CookedRecipes cookedRecipes={cookbook.recipes.filter(recipe => recipe.cooked)}/> */}
    </>
  )
}

export default HomePage