import React, { Component } from 'react';

class Recipes extends Component {
  render() {
    const { value } = this.props;

    if (value.length) {
      const keys = Object.keys(value[0]);
      return (
        <div>
          {keys.includes('strMeal')
            ? value.map((meal, index) => (
              <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt=""
                />
                <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
              </div>
            ))
            : value.map((drink, index) => (
              <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt=""
                />
                <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
              </div>
            ))}
          {' '}
        </div>
      );
    }
    console.log('nao deu');
  }
}

export default Recipes;
