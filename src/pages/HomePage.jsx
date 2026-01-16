import data from '../data/data.json';
import Recipes from '../components/Recipes';

const HomePage = () => {
  const recipes = data.recipes;
  return (
    <>
      <Recipes recipes={recipes}/>
    </>
  )
}

export default HomePage