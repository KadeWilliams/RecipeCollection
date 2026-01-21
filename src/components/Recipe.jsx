import {useState} from 'react';
import '../styles/flip.css';
import { Link } from 'react-router-dom';

const Recipe = ({recipe}) => {
  const [showImage, setShowImage] = useState(recipe.recipeImageUrl ? true : false);

  const handleFlip = () => {
    if (!recipe.recipeImageUrl) {
      return;
    }
    setShowImage(!showImage);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
  }


  return (
    <div style={recipe.recipeImageUrl ? { cursor:"pointer"} : {cursor: "default"}}className={`flip-card ${!showImage ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            style={{ width: '18rem', height: '22rem' }}
            src={recipe.recipeImageUrl}
            alt={recipe.title}
          />
        </div>

        {/* Back of the card */}
        <div className="flip-card-back">
          <div style={{ width: '18rem', height: '22rem' }}>
            <div>
              <div>{recipe.title}</div>
              <div className="mb-2 text-muted">{recipe.chef}</div>
              <div variant="flush">
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                  <Link to={`/recipes/edit/${recipe.id}`} onClick={handleButtonClick}>Edit Recipe</Link>
                  <Link to={`/recipes/${recipe.id}`} onClick={handleButtonClick}>Recipe Details</Link>
                  {/* <div to={`/cookbook/`+cookbook.id}>Link</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe