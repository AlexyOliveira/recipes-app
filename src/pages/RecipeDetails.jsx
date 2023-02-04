import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getMealById, getDrinkById, getAllMeals, getAllDrinks } from '../services/api';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeDetails.css';

function RecipeDetails() {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [startedRecipe, setStartedRecipe] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const magicNumber = -11;
  const magicN = 6;
  const getStartedRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const id = location.pathname.split('/')[2];
  const type = location.pathname.split('/')[1];
  useEffect(() => {
    const getRecipe = async () => {
      if (type === 'meals') {
        const meal = await getMealById(id);
        setRecipe([meal]);
        const drinkCategories = await getAllDrinks();
        setRecommendations(drinkCategories);
      } else {
        const drink = await getDrinkById(id);
        setRecipe([drink]);
        const mealCategories = await getAllMeals();
        setRecommendations(mealCategories);
      }
    };
    getRecipe();
  }, [location, id, type]);
  useEffect(() => {
    if (!getStartedRecipe) {
      const startedRecipex = {
        drinks: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipex));
    }
  }, [getStartedRecipe]);
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const favorite = favoriteRecipes.find((item) => item.id === id);
      if (favorite) {
        setIsFavorite(true);
      }
    }
  }, [id]);
  useEffect(() => {
    if (getStartedRecipe !== null) {
      if (type === 'meals' && getStartedRecipe.meals[id]) {
        setStartedRecipe(true);
      }
      if (type === 'drinks' && getStartedRecipe.drinks[id]) {
        setStartedRecipe(true);
      }
    }
  }, [getStartedRecipe, location, id, type]);
  const copiarClipBoard = () => {
    setCopiado(true);
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };
  const saveFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { strMeal, strDrink, strCategory, strArea,
      strAlcoholic, strMealThumb, strDrinkThumb } = recipe[0];
    const favorite = {
      id,
      type: type === 'meals' ? 'meal' : 'drink',
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
      if (favoriteRecipes) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoriteRecipes, favorite]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      }
      setIsFavorite(true);
    }
  };
  return (
    <div>
      <h1>RecipeDetails</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copiarClipBoard }
      >
        Share Recipe
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="favorite" />
      </button>
      {copiado && <p>Link copied!</p>}
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
            {Object.keys(item)
              .reduce((acc, key) => {
                if (key.includes('Ingredient')
                  && item[key] !== '' && item[key] !== null) {
                  return [...acc, item[key]];
                }
                return acc;
              }, [])
              .map((ingredient, i) => (
                <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
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
      <h3>Recomendations</h3>
      <div className="recommendations" style={ { marginBottom: '50px' } }>
        {recommendations.map(
          (item, index) => index < magicN && (
            <div key={ index }>
              <img
                data-testid={ `${index}-recommendation-card` }
                src={ item.strMealThumb || item.strDrinkThumb }
                alt={ item.strMeal || item.strDrink }
                className="recommendation-img"
              />
              <h2 data-testid={ `${index}-recommendation-title` }>
                {item.strMeal || item.strDrink}
              </h2>
            </div>
          ),
        )}
      </div>
      <Link to={ `/${type}/${id}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn" className="start-recipe-btn">
          {startedRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>
    </div>
  );
}
export default RecipeDetails;
