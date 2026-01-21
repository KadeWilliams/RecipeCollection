import { useState, useEffect } from "react"
import Recipe from "./Recipe";
import '../styles/recipes.css';

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const apiUrl = 'api/recipes';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setRecipeList(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [])

  return (
    loading 
    ? <h1>Loading</h1> 
    : 
    <div className="recipe-container">
      {recipeList.map(recipe => <Recipe recipe={recipe}/>)}
    </div>
  )
}

export default Recipes