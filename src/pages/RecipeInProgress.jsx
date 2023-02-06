import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealById, getDrinkById } from '../services/api';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareImg from '../images/shareIcon.svg';

function RecipesInProgress() {
  const location = useLocation();
  const typeLocation = location.pathname.split('/')[1];
  const id = location.pathname.split('/')[2];

  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [storage, setStorage] = useState([]);

  const stylito = 'line-through solid rgb(0, 0, 0)';

  useEffect(() => {
    const getRecipe = async () => {
      if (typeLocation === 'meals') {
        const meal = await getMealById(id);
        setRecipe([meal]);
      } else {
        const drink = await getDrinkById(id);
        setRecipe([drink]);
      }
    };
    getRecipe();
  }, [id, typeLocation]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const favorite = favoriteRecipes.find((item) => item.id === id);
      if (favorite) {
        setIsFavorite(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressStorage === null) {
      if (typeLocation === 'meals') {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: { [id]: [] },
          drinks: {},
        }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: {},
          drinks: { [id]: [] },
        }));
      }
    } else if (progressStorage !== null && recipe.length > 0) {
      const getNewStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const storageId = getNewStorage[typeLocation][id];

      // check the checkbox
      const checkbox = document.querySelectorAll('input[type="checkbox"]');

      checkbox.forEach((item) => {
        if (storageId.includes(item.parentNode.innerText)) {
          item.checked = true;
          item.parentNode.style.textDecoration = stylito;
        }
      });
    }
  }, [recipe, id, typeLocation]);

  const riscaCheckboxes = ({ target }) => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (target.checked) {
      target.parentNode.style.textDecoration = stylito;
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getStorage,
        [typeLocation]: {
          ...getStorage[typeLocation],
          [id]: [...getStorage[typeLocation][id], target.parentNode.innerText],
        },
      }));
      setStorage([...storage, target.parentNode.innerText]);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getStorage,
        [typeLocation]: {
          ...getStorage[typeLocation],
          [id]: getStorage[typeLocation][id]
            .filter((item) => item !== target.parentNode.innerText),
        },
      }));
      setStorage(storage.filter((item) => item !== target.parentNode.innerText));
      target.parentNode.style.textDecoration = 'none';
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        src={ shareImg }
      >
        <img
          src={ shareImg }
          alt="share"
        />
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="whiteHeartIcon"
        />
      </button>

      {recipe.length > 0 && recipe.map((item, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ item.strMealThumb || item.strDrinkThumb }
            alt="recipe"
          />
          <h1 data-testid="recipe-title">{item.strMeal || item.strDrink}</h1>
          <h2 data-testid="recipe-category">{item.strCategory}</h2>
          <h2 data-testid="recipe-category">{item.strAlcoholic}</h2>
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(item)
              .reduce((acc, key) => {
                if (key.includes('Ingredient')
                  && item[key] !== '' && item[key] !== null) {
                  return [...acc, item[key]];
                }
                return acc;
              }, [])
              .map((ingredient, i) => (
                <li key={ i }>
                  <label
                    htmlFor={ ingredient }
                    data-testid={ `${i}-ingredient-step` }
                    style={ storage.length > 0 && storage.includes(ingredient)
                      ? { textDecoration: stylito }
                      : { textDecoration: 'none' } }
                  >
                    <input
                      type="checkbox"
                      onClick={ riscaCheckboxes }
                      id={ ingredient }
                    />
                    {ingredient}
                  </label>
                </li>
              ))}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{item.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipesInProgress;
