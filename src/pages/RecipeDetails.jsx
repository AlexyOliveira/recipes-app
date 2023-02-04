import React, { Component } from 'react';
import { getMealsbyId } from '../services/api';
import { getDrinksbyId } from '../services/drinksAPI';

class RecipeDetails extends Component {
  state = {
    recipeResults: [],
    resultDrinkOrMeals: '',
    ingredients: [],
    measures: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const splitHistory = history.location.pathname.split('/');
    this.setState({
      resultDrinkOrMeals: splitHistory[1],
    });
    if (splitHistory[1] === 'meals') {
      const meals = await getMealsbyId(splitHistory[2]);
      this.setState({
        recipeResults: meals,
      }, () => { this.filterIngredients(); this.filterMeasures(); });
    } else if (splitHistory[1] === 'drinks') {
      const drinks = await getDrinksbyId(splitHistory[2]);
      this.setState({
        recipeResults: drinks,
      }, () => { this.filterIngredients(); this.filterMeasures(); });
    }
  }

  filterIngredients = () => {
    const { recipeResults } = this.state;
    const indice = recipeResults[0];
    const strIngredients = Object.keys(indice)
      .filter((key) => key.startsWith('strIngredient'))
      .map((key) => indice[key])
      .filter((ingredient) => ingredient);
    this.setState({
      ingredients: strIngredients,
    });
  };

  filterMeasures = () => {
    const { recipeResults } = this.state;
    const indice = recipeResults[0];
    const strMeasures = Object.keys(indice)
      .filter((key) => key.startsWith('strMeasure'))
      .map((key) => indice[key])
      .filter((ingredient) => ingredient);
    this.setState({
      measures: strMeasures,
    });
  };

  render() {
    const { recipeResults, resultDrinkOrMeals, ingredients, measures } = this.state;
    console.log(recipeResults);
    return (
      <>
        <div>RecipeDetails</div>
        {resultDrinkOrMeals === 'meals'
          ? recipeResults?.map((result) => (
            <div key={ result.idMeal }>
              <img
                data-testid="recipe-photo"
                src={ result.strMealThumb }
                alt={ result.strMeal }
              />
              <h2 data-testid="recipe-title">{result.strMeal}</h2>
              <h4 data-testid="recipe-category">{result.strCategory}</h4>
              <ul />
              {ingredients?.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))}
              <ul />

              <ul>
                {measures?.map((measure, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {measure}
                  </li>
                ))}
              </ul>

              <p data-testid="instructions">{result.strInstructions}</p>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ result?.strYoutube }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          ))
          : recipeResults?.map((result) => (
            <div key={ result.idDrink }>
              <img
                data-testid="recipe-photo"
                src={ result.strDrinkThumb }
                alt={ result.strDrink }
              />
              <h2 data-testid="recipe-title">{result.strDrink}</h2>
              <h4>{result.strCategory}</h4>
              <p data-testid="recipe-category">{result.strAlcoholic}</p>
              <ul>
                {ingredients?.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>

              <ul>
                {measures?.map((measure, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {measure}
                  </li>
                ))}
              </ul>

              <p data-testid="instructions">{result.strInstructions}</p>
            </div>
          ))}
      </>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    pathname: PropTypes.func,
    location: PropTypes.func,
  }).isRequired,
};

export default RecipeDetails;
