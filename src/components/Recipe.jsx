import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Recipe.css";

const Recipe = ({ recipe }) => {
  const [showImage, setShowImage] = useState(
    recipe.recipeImageUrl ? true : false,
  );

  const handleFlip = () => {
    if (!recipe.recipeImageUrl) return;
    setShowImage(!showImage);
  };

  const handleButtonClick = (e) => e.stopPropagation();

  const mealTags = recipe.meals?.filter((m) => m) || [];

  return (
    <div
      className={`recipe-card ${!showImage ? "flipped" : ""} ${!recipe.recipeImageUrl ? "no-image" : ""}`}
      onClick={handleFlip}
      style={{ cursor: recipe.recipeImageUrl ? "pointer" : "default" }}
    >
      <div className="recipe-card-inner">
        {/* FRONT — image */}
        <div className="recipe-card-front">
          {recipe.recipeImageUrl ? (
            <img src={recipe.recipeImageUrl} alt={recipe.title} />
          ) : (
            <div className="recipe-card-no-img">
              <span className="no-img-icon">◈</span>
              <span>NO IMAGE</span>
            </div>
          )}
          {mealTags.length > 0 && (
            <div className="card-meal-tags">
              {mealTags.map((m) => (
                <span key={m} className="meal-tag">
                  {m.toUpperCase()}
                </span>
              ))}
            </div>
          )}
          {recipe.recipeImageUrl && (
            <div className="flip-hint">CLICK TO FLIP ↻</div>
          )}
        </div>

        {/* BACK — info */}
        <div className="recipe-card-back">
          <div className="card-back-content">
            <div className="card-back-top">
              <div className="card-index-num">◈</div>
              {recipe.seasons
                ?.filter((s) => s)
                .map((s) => (
                  <span key={s} className="season-tag">
                    {s.toUpperCase()}
                  </span>
                ))}
            </div>

            <div className="card-back-title">{recipe.title}</div>

            <div className="card-back-chef">
              <span className="chef-label">BY//</span>
              <span>{recipe.chef || "UNKNOWN"}</span>
            </div>

            {recipe.isFavorite && (
              <div className="favorite-badge">★ FAVORITE</div>
            )}
            {recipe.cooked && <div className="cooked-badge">✓ COOKED</div>}

            <div className="card-back-actions" onClick={handleButtonClick}>
              <Link
                to={`/recipes/${recipe.id}`}
                className="card-btn card-btn--primary"
              >
                VIEW RECIPE
              </Link>
              <Link
                to={`/recipes/edit/${recipe.id}`}
                className="card-btn card-btn--secondary"
              >
                EDIT
              </Link>
            </div>

            <div className="flip-hint-back">CLICK TO FLIP ↺</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
