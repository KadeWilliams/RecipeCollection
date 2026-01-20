import {useState} from 'react';
import '../styles/flip.css';

const Recipe = ({recipe}) => {
  const [showImage, setShowImage] = useState(recipe.recipeImage ? true : false);

  const handleFlip = () => {
    if (!recipe.recipeImage) {
      return;
    }
    setShowImage(!showImage);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    console.log("button clicked");
  }


  return (
    <div className={`flip-card ${!showImage ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            style={{ width: '18rem', height: '22rem' }}
            src={recipe.recipeImage}
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
                <div>
                  <button onClick={handleButtonClick}>Edit Recipe</button>
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