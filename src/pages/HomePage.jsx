import data from '../data/data.json';
import Recipes from '../components/Recipes';
import Cookbooks from '../components/Cookbooks';
// import CookedRecipes from '../components/CookedRecipes';

// TODO: Implement the "Cooked Recipes Component"
// Might want to have a section to show all of that. Probably beyond the scope of what I want to do right now

const HomePage = () => {
  const cookbooks = data[0].cookbooks;
  return (
    // some element at the top
      <Cookbooks cookbooks={cookbooks}/>
      // {/* Home Page might just be a landing page, at some point, right now it's not necessary */}
      // {/* <Recipes title={cookbook.title} recipes={cookbook.recipes}/> */}
      // {/* <CookedRecipes cookedRecipes={cookbook.recipes.filter(recipe => recipe.cooked)}/> */}
  )
}

export default HomePage