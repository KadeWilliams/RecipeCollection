import { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "../styles/Recipes.css";

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`);
        const data = await res.json();
        setRecipeList(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="recipes-loading">
        <span className="loading-text">LOADING</span>
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    );
  }

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <div className="header-left">
          <div className="header-tag">RECIPE//DATABASE</div>
          <h1 className="recipes-title">
            THE
            <br />
            COLLECTION
          </h1>
        </div>
        <div className="header-right">
          <div className="recipes-count">
            <span className="count-num">
              {String(recipeList.length).padStart(2, 0)}
            </span>
            <span className="count-label">
              RECIPES
              <br />
              LOGGED
            </span>
          </div>
        </div>
      </div>

      {recipeList.length === 0 ? (
        <div className="recipes-empty">
          <div className="empty-code">404</div>
          <div className="empty-msg">
            NO RECIPES FOUND
            <br />
            <span>ADD ONE TO GET STARTED</span>
          </div>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipeList.map((recipe, i) => (
            <div
              key={recipe.id}
              className="recipe-grid-item"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Recipe recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
