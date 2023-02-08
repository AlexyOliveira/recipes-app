import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getMealById, getDrinkById } from '../services/api';

function RecipesInProgress() {
  const location = useLocation();
  const typeLocation = location.pathname.split('/')[1];
  const id = location.pathname.split('/')[2];

  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [storage, setStorage] = useState([]);
  const [copiado, setCopiado] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

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

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { strMeal, strDrink, strCategory, strArea,
      strAlcoholic, strMealThumb, strDrinkThumb } = recipe[0];
    const favorite = {
      id,
      type: typeLocation === 'meals' ? 'meal' : 'drink',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
      nationality: strArea || '',
    };
    if (isFavorite) {
      const newFavorite = favoriteRecipes.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));

      setIsFavorite(true);
    }
  };

  const handleShare = () => {
    setCopiado(true);
    const url = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(url);
  };
  useEffect(() => {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    const array = [...checkbox];
    console.log(array);
    const check = array.every((item) => item.checked);
    if (check) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isDisabled, storage]);
  const doneRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const { strMeal, strDrink, strCategory, strArea,
      strAlcoholic, strMealThumb, strDrinkThumb } = recipe[0];
    const done = {
      id,
      type: typeLocation === 'meals' ? 'meal' : 'drink',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
      nationality: strArea || '',
      doneDate: new Date(),
      tags: recipe[0].strTags ? recipe[0].strTags.split(',') : [],
    };
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([done]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, done]));
    }
  };
  return (
    <div>
      <div
        data-testid="share-btn"
        onClick={ handleShare }
        onKeyDown={ (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleShare();
          }
        } }
        tabIndex={ 0 }
        role="button"
      >
        <i className="fa-solid fa-share-from-square shareButton" />
      </div>

      <div
        onClick={ handleFavorite }
        data-testid="favorite-btn"
        onKeyDown={ (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleFavorite();
          }
        } }
        tabIndex={ 0 }
        role="button"
      >
        {isFavorite ? (
          <i className="fa-solid fa-heart solidHeart" />
        ) : (
          <i className="fa-regular fa-heart enptyHeart" />
        )}
      </div>

      {copiado && <span>Link copied!</span>}

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
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ doneRecipe }
            >
              Finish Recipe
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecipesInProgress;
