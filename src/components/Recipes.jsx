import React from 'react'
import { useState } from 'react';
import { Row, Col, Accordion, Form, Container } from 'react-bootstrap'


const Recipe = ({recipe}) => {
    const [checked, setChecked] = useState(recipe.cooked);
    const handleCheckClick = () => {
        setChecked(!checked);
    }
    {/*
      
        <ol className="my-5">
            {recipe.ingredients.map((ingredient, ind) => ( 
                // TODO: Figure out a way to make these "markable" (check them off like you would when shopping)
                    <li key={ind}>
                        {ingredient.ingredientName} {ingredient.amount} {ingredient.unit} <em style={{color: "gray"}}>{ingredient.isOptional ? "optional" : ""}</em>
                    </li>
                )
            )}
        </ol>
        <ul>
            TODO: Figure out a way to make these "markable" (check them off like you would when cooking)
            {recipe.steps.map((step, ind) => <li key={ind}>{step}</li>)}
        </ul>
      */}
    return (
      <div style={{border: '1px solid black', padding:'10px', margin:'10px'}} className="d-flex flex-column">
        <h3>{recipe.title}</h3>
        <button className='align-self-end'>View</button>
      </div>
    )
}

const Recipes = ({recipes}) => {
  return (
      <div className="d-flex justify-content-evenly">
      {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)}
    </div>
  )
}

export default Recipes