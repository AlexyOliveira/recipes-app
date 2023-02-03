import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealById, getDrinkById } from '../services/api';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);

  const magicNumber = -11;

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    const type = location.pathname.split('/')[1];

    const getRecipe = async () => {
      if (type === 'meals') {
        const meal = await getMealById(id);
        setRecipe([meal]);
      } else {
        const drink = await getDrinkById(id);
        setRecipe([drink]);
      }
    };

    getRecipe();
  }, [location]);
  console.log(recipe);
  return (
    <div>
      <h1>RecipeDetails</h1>
      {recipe.map((item, index) => (
        <div key={ index }>
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            alt={ item.strMeal }
            style={ { width: '200px' } }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strMeal || item.strDrink}</h2>
          <h3 data-testid="recipe-category">{item.strCategory}</h3>
          <h3 data-testid="recipe-category">{item.strAlcoholic}</h3>
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(item).reduce((acc, key) => {
              if (key.includes('Ingredient') && item[key] !== '' && item[key] !== null) {
                return [...acc, item[key]];
              }
              return acc;
            }, []).map((ingredient, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${item[`strMeasure${i + 1}`]}`}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{item.strInstructions}</p>
          {/* use replace in the video to work */}
          {item.strYoutube && (
            <>
              <h3>Video</h3>
              <iframe
                data-testid="video"
                title="recipe"
                width="360"
                height="315"
                src={ `https://www.youtube.com/embed/${item.strYoutube.slice(magicNumber)}` }
              />
            </>

          )}
        </div>
      ))}
    </div>
  );
}

export default RecipeDetails;
