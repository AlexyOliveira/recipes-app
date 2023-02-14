import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function FinishRecipeButton({ values }) {
  const [isDisabled, recipe] = values;
  const location = useLocation();
  const typeLocation = location.pathname.split('/')[1];
  const id = location.pathname.split('/')[2];

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
      <Link to="/done-recipes">
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDisabled }
          onClick={ doneRecipe }
        >
          Finish Recipe
        </button>
      </Link>
    </div>
  );
}

FinishRecipeButton.propTypes = {
  values: PropTypes.func.isRequired,
};

export default FinishRecipeButton;
