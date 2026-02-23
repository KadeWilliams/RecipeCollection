/*
import { useActionState, useEffect } from "react";
import { deleteRecipe } from "../actions/recipe.actions";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";

const RecipePage = () => {
  const {id} = useParams();
  const recipe = useLoaderData();
  const navigate = useNavigate();

  const [state, formAction] = useActionState(deleteRecipe, {
    success: false,
    message: '',
  })

  console.log(recipe);

  useEffect(() => {
    if (state.success) {
      if (state.message) {
        console.log(state.message);
      }
      navigate('/')
    } else {
      if (state.message) {
        console.error(state.message);
      }
    }
  }, [state, navigate])



  return (
    <>
      <form action={formAction}>
        <input 
          value={recipe.id}
          hidden 
          id="id"
          name="id"
          readOnly
        />
        <button>
          Delete recipe 
        </button>
      </form>
    </>
  )
}

const recipeLoader = async ({params}) => {
  const res = await fetch(`/api/recipes/${params.id}`);
  const data = await res.json();
  console.log(data);
  return data;
};


export { RecipePage as default, recipeLoader }
*/

import { useActionState, useEffect, useState } from "react";
import { deleteRecipe } from "../actions/recipe.actions";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import "../styles/RecipePage.css";

const RecipePage = () => {
  const { id } = useParams();
  const recipe = useLoaderData();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [state, formAction] = useActionState(deleteRecipe, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      if (state.message) console.log(state.message);
      navigate("/");
    } else {
      if (state.message) console.error(state.message);
    }
  }, [state, navigate]);

  const meals = recipe.meals?.filter(Boolean) || [];
  const seasons = recipe.seasons?.filter(Boolean) || [];

  return (
    <div className="rp-page">
      {/* ── HERO ── */}
      <div className="rp-hero">
        {recipe.recipeImageUrl && (
          <div className="rp-hero-img">
            <img src={recipe.recipeImageUrl} alt={recipe.title} />
            <div className="rp-hero-img-overlay" />
          </div>
        )}
        <div
          className={`rp-hero-content ${!recipe.recipeImageUrl ? "rp-hero-content--no-img" : ""}`}
        >
          <div className="rp-nav-row">
            <Link to="/" className="rp-back-link">
              ← INDEX
            </Link>
            <Link to={`/recipes/edit/${recipe.id}`} className="rp-edit-link">
              EDIT ✎
            </Link>
          </div>

          <div className="rp-tags-row">
            {meals.map((m) => (
              <span key={m} className="rp-tag rp-tag--meal">
                {m.toUpperCase()}
              </span>
            ))}
            {seasons.map((s) => (
              <span key={s} className="rp-tag rp-tag--season">
                {s.toUpperCase()}
              </span>
            ))}
            {recipe.isFavorite && (
              <span className="rp-tag rp-tag--fav">★ FAVORITE</span>
            )}
            {recipe.cooked && (
              <span className="rp-tag rp-tag--cooked">✓ COOKED</span>
            )}
          </div>

          <h1 className="rp-title">{recipe.title}</h1>

          <div className="rp-meta">
            <div className="rp-meta-item">
              <span className="rp-meta-label">BY//</span>
              <span className="rp-meta-value">{recipe.chef || "UNKNOWN"}</span>
            </div>
            {recipe.cookbook && (
              <div className="rp-meta-item">
                <span className="rp-meta-label">FROM//</span>
                <span className="rp-meta-value">
                  {recipe.cookbook}
                  {recipe.page ? ` P.${recipe.page}` : ""}
                </span>
              </div>
            )}
            {recipe.dateCooked && (
              <div className="rp-meta-item">
                <span className="rp-meta-label">COOKED//</span>
                <span className="rp-meta-value">
                  {new Date(recipe.dateCooked)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="rp-body">
        {/* Description */}
        {recipe.description && (
          <div className="rp-section rp-description-section">
            <div className="rp-section-label">// ABOUT</div>
            <p className="rp-description">{recipe.description}</p>
            {recipe.link && (
              <a
                href={recipe.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rp-source-link"
              >
                VIEW ORIGINAL SOURCE ↗
              </a>
            )}
          </div>
        )}

        <div className="rp-two-col">
          {/* Ingredients */}
          <div className="rp-section">
            <div className="rp-section-label">
              // INGREDIENTS
              <span className="rp-section-count">
                {recipe.ingredients?.length || 0}
              </span>
            </div>
            <div className="rp-ingredients">
              {recipe.ingredients?.map((ing, i) => (
                <div
                  key={i}
                  className={`rp-ing-row ${ing.isOptional ? "rp-ing-row--optional" : ""}`}
                >
                  <div className="rp-ing-amount">
                    {ing.amount > 0 ? ing.amount : "—"}
                    {ing.unit && (
                      <span className="rp-ing-unit"> {ing.unit}</span>
                    )}
                  </div>
                  <div className="rp-ing-name">
                    {ing.ingredientName}
                    {ing.isOptional && (
                      <span className="rp-optional-badge">OPT</span>
                    )}
                  </div>
                  {ing.note && <div className="rp-ing-note">{ing.note}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Cookbook aside (if present) */}
          {recipe.cookbook && recipe.cookbookImageUrl && (
            <div className="rp-cookbook-aside">
              <div className="rp-section-label">// SOURCE</div>
              <div className="rp-cookbook-card">
                <img src={recipe.cookbookImageUrl} alt={recipe.cookbook} />
                <div className="rp-cookbook-info">
                  <div className="rp-cookbook-title">{recipe.cookbook}</div>
                  {recipe.page && (
                    <div className="rp-cookbook-page">PAGE {recipe.page}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Steps */}
        {recipe.steps?.length > 0 && (
          <div className="rp-section">
            <div className="rp-section-label">
              // METHOD
              <span className="rp-section-count">
                {recipe.steps.length} STEPS
              </span>
            </div>
            <div className="rp-steps">
              {recipe.steps.filter(Boolean).map((step, i) => (
                <div key={i} className="rp-step">
                  <div className="rp-step-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="rp-step-text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete */}
        <div className="rp-danger-zone">
          <div className="rp-section-label rp-section-label--danger">
            // DANGER ZONE
          </div>
          {!confirmDelete ? (
            <button
              type="button"
              className="rp-btn-delete"
              onClick={() => setConfirmDelete(true)}
            >
              DELETE RECIPE
            </button>
          ) : (
            <div className="rp-delete-confirm">
              <span className="rp-confirm-msg">
                ARE YOU SURE? THIS CANNOT BE UNDONE.
              </span>
              <form action={formAction} className="rp-confirm-form">
                <input value={recipe.id} hidden id="id" name="id" readOnly />
                <button type="submit" className="rp-btn-delete-confirm">
                  YES, DELETE
                </button>
                <button
                  type="button"
                  className="rp-btn-cancel"
                  onClick={() => setConfirmDelete(false)}
                >
                  CANCEL
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const recipeLoader = async ({ params }) => {
  const res = await fetch(`/api/recipes/${params.id}`);
  const data = await res.json();
  return data;
};

export { RecipePage as default, recipeLoader };
