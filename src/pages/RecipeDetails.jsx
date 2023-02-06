import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getMealById, getDrinkById, getAllMeals, getAllDrinks } from '../services/api';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeDetails.css';
import shaereIcon from '../images/shareIcon.svg';

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
  const startRecipeStorage = () => {
    const startedRecipeStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'meals') {
      startedRecipeStorage.meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipeStorage));
    } else {
      startedRecipeStorage.drinks[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipeStorage));
    }
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
    <div className="recipeDetailsContainer">
      {copiado && <p>Link copied!</p>}
      {recipe.map((item, index) => (
        <div key={ index }>
          <div className="card mb-3">
            <img
              className="recipeImg"
              src={ item.strMealThumb || item.strDrinkThumb }
              alt={ item.strMeal }
              // style={ { width: '200px' } }
              data-testid="recipe-photo"
            />
            <h2 className="recipeName" data-testid="recipe-title">
              {item.strMeal || item.strDrink}
            </h2>
            <h3 data-testid="recipe-category">{item.strCategory}</h3>
            <h3 data-testid="recipe-category">{item.strAlcoholic}</h3>
            <div className="shareLike">
              {/* <button type="button"  >
                Share Recipe
              </button> */}
              <input
                className="svgImg"
                type="image"
                src={ shaereIcon }
                onClick={ copiarClipBoard }
                data-testid="share-btn"
                alt="shareIcon"
              />
              <input
                className="favorite"
                alt="favorite"
                type="image"
                data-testid="favorite-btn"
                onClick={ saveFavorite }
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              />
            </div>
          </div>
          <h3 className="ingre">Ingredients</h3>
          <div className="ingredients">
            <ul>
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
                  <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                    {`${ingredient} - ${item[`strMeasure${i + 1}`]}`}
                  </li>
                ))}
            </ul>
          </div>
          <h3>Instructions</h3>
          <div className="instructions">
            <p data-testid="instructions">{item.strInstructions}</p>
          </div>
          {/* use replace in the video to work */}
          {item.strYoutube && (
            <>
              <h3>Video</h3>
              <iframe
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
      ))}
      <h3>Recomendations</h3>
      <div className="recommendations" style={ { marginBottom: '50px' } }>
        {recommendations.map(
          (item, index) => index < magicN && (
            <div className="cardSlide" key={ index }>
              <div className="card cardGrade">
                <img
                  data-testid={ `${index}-recommendation-card` }
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt={ item.strMeal || item.strDrink }
                  className="recommendation-img card-img-top"
                />
                <h2
                  className=""
                  data-testid={ `${index}-recommendation-title` }
                >
                  {item.strMeal || item.strDrink}
                </h2>
              </div>
            </div>
          ),
        )}
      </div>
      <Link to={ `/${type}/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ startRecipeStorage }

        >
          {startedRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>
    </div>
  );
}
export default RecipeDetails;
