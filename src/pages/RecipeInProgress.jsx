import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FinishRecipeButton from '../components/FinishRecipeButton';
import { getMealById, getDrinkById } from '../services/api';
import './meals.css';

const magicNumber = -11;
const fiveSeconds = 5000;
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
    setTimeout(() => {
      setCopiado(false);
    }, fiveSeconds);
    const url = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(url);
    console.log(url);
  };
  useEffect(() => {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    const array = [...checkbox];
    const check = array.every((item) => item.checked);
    if (check) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isDisabled, storage]);
  return (
    <div className="recipeDetailsContainer">
      {recipe.length > 0
        && recipe.map((item, index) => (
          <div key={ index }>
            <div className="card mb-3">
              <img
                className="recipeImg"
                data-testid="recipe-photo"
                src={ item.strMealThumb || item.strDrinkThumb }
                alt="recipe"
              />
              <h1 className="recipeName" data-testid="recipe-title">
                {item.strMeal || item.strDrink}
              </h1>
              <h2 data-testid="recipe-category">{item.strCategory}</h2>
              <h2 data-testid="recipe-category">{item.strAlcoholic}</h2>
              <div className="shareLike">
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
                  {copiado && <span className="done-copied">Link copied!</span>}
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
              </div>
            </div>
            <div className="glob">
              <h3>Ingredients</h3>
              <div className="ingredients m-2 mb-4">
                <ul className="ingredient-checkbox">
                  {Object.keys(item)
                    .reduce((acc, key) => {
                      if (
                        key.includes('Ingredient')
                    && item[key] !== ''
                    && item[key] !== null
                      ) {
                        return [...acc, item[key]];
                      }
                      return acc;
                    }, [])
                    .map((ingredient, i) => (
                      <li key={ i }>
                        <label
                          htmlFor={ ingredient }
                          data-testid={ `${i}-ingredient-step` }
                          style={
                            storage.length > 0 && storage.includes(ingredient)
                              ? { textDecoration: stylito }
                              : { textDecoration: 'none' }
                          }
                        >
                          <input
                            className="check"
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
                <div className="instructions">
                  <p data-testid="instructions">{item.strInstructions}</p>
                </div>

              </div>
              {/* use replace in the video to work */}
              {item.strYoutube && (
                <>
                  <h3>Video</h3>
                  <iframe
                    className="iframe"
                    data-testid="video"
                    title="recipe"
                    width="360"
                    height="315"
                    src={ `https://www.youtube.com/embed/${item.strYoutube.slice(
                      magicNumber,
                    )}` }
                  />
                </>
              )}
            </div>
            <FinishRecipeButton values={ [isDisabled, recipe] } />
          </div>
        ))}
    </div>
  );
}
export default RecipesInProgress;
