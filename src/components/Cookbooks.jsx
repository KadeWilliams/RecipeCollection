import React from 'react'
import { useState } from 'react';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import "../styles/Flip.css";
import "../styles/Cookbook.css";
import { Link } from 'react-router-dom';

const Cookbook = ({ cookbook }) => {
  const [showCover, setShowCover] = useState(true);

  const handleFlip = (e) => {
    e.stopPropagation();
    setShowCover(!showCover);
  };

  return (
    <div className={`flip-card ${!showCover ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Image
            style={{ width: '18rem', height: '22rem' }}
            src={cookbook.imageUrl}
            alt={cookbook.title}
          />
        </div>

        {/* Back of the card */}
        <div className="flip-card-back">
          <Card style={{ width: '18rem', height: '22rem' }}>
            <Card.Body>
              <Card.Title>{cookbook.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{cookbook.author}</Card.Subtitle>
              <Card.Text>{cookbook.subtitle}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Recipes: {cookbook.recipes.length}</ListGroup.Item>
                <ListGroup.Item>Pages: {cookbook.pages}</ListGroup.Item>
                <ListGroup.Item>
                  <Link to={`/cookbook/`+cookbook.id}>Link</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Cookbooks = ({cookbooks}) => {
  return (
    <>
        <h1>Cookbook Collection</h1>
        <Container className="flip-card-container cookbook-container" fluid>
            {cookbooks.map(cookbook => (
                  <Col className="my-3"><div className="flipper px-2 mx-2"><Cookbook key={cookbook.id} cookbook={cookbook}/></div></Col>
                )
              )
            }
        </Container>
    </>
  )
}

export default Cookbooks