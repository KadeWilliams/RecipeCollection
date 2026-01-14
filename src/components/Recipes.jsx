import React from 'react'
import { useState } from 'react';
import { Row, Col, Accordion, Form, Container } from 'react-bootstrap'


const Recipe = ({recipe}) => {
    const [checked, setChecked] = useState(recipe.cooked);
    const handleCheckClick = () => {
        setChecked(!checked);
    }
    return (
        <>
        <Accordion.Item eventKey={recipe.id}>
            <Accordion.Header>
                <Container>
                    <Row className="d-flex justify-content-evenly">
                        <Col xs={2}>
                            <Form>
                                <Form.Group className="my-3 justify-content-center">
                                    <Form.Check type="checkbox" checked={checked} onClick={(e) => e.stopPropagation()} onChange={handleCheckClick}></Form.Check>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={10} className="align-self-center">
                            {recipe.name}
                        </Col>
                    </Row>
                </Container>
            </Accordion.Header>
            <Accordion.Body>
                <Container>
                {recipe.description}
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
                    {/* TODO: Figure out a way to make these "markable" (check them off like you would when cooking) */}
                    {recipe.steps.map((step, ind) => <li key={ind}>{step}</li>)}
                </ul>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
        </>
        
    )
}

const Recipes = ({recipes, title}) => {
  return (
    <>
        <h1>{title}</h1>
        <Accordion className="px-5" xs={10}>
            {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)}
        </Accordion>
    </>
  )
}

export default Recipes