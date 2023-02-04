import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Recipes extends Component {
  handleCardClick = (id) => {
    const { history } = this.props;
    const [mealOrDrink, idMealOrDrink] = id.split('.');
    console.log(mealOrDrink);
    const path = mealOrDrink === 'meal'
      ? `/meals/${idMealOrDrink}`
      : `/drinks/${idMealOrDrink}`;
    history.push(path);
  };

  render() {
    const { value } = this.props;
    if (!value || !value.length) return null;

    const keys = Object.keys(value[0]);
    return (
      <div>
        {keys.includes('strMeal')
          ? value.map((meal, index) => (
            <div
              tabIndex="0"
              onClick={ () => this.handleCardClick(`meal.${meal.idMeal}`) }
              onKeyPress={ (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  this.handleCardClick(`meal.${meal.idMeal}`);
                }
              } }
              key={ meal.idMeal }
              role="button"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt=""
              />
              <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
            </div>
          ))
          : value.map((drink, index) => (
            <div
              tabIndex="0"
              onClick={ () => this.handleCardClick(`drink.${drink.idDrink}`) }
              onKeyPress={ (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  this.handleCardClick(`drink.${drink.idDrink}`);
                }
              } }
              key={ drink.idDrink }
              role="button"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt=""
              />
              <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
            </div>
          ))}
      </div>
    );
  }
}
Recipes.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      strMeal: PropTypes.string,
      strDrink: PropTypes.string,
      idMeal: PropTypes.string,
      idDrink: PropTypes.string,
      strMealThumb: PropTypes.string,
      strDrinkThumb: PropTypes.string,
    }),
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  history: globalState.globalHistoryReducer.history,
});

export default connect(mapStateToProps)(Recipes);