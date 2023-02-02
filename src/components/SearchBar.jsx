import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFirstLetter, getIngredient, getName } from '../services/api';
import {
  getDrinkFirstLetter,
  getDrinkIngredient,
  getDrinkName,
} from '../services/drinksAPI';
import { drinkResults, mealResults } from '../redux/actions';

class SearchBar extends Component {
  state = {
    radioSelected: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      radioSelected: target.id,
    });
  };

  pathMealsHandle = async () => {
    const { history } = this.props;
    if (history.location.pathname === '/meals') {
      const { radioSelected } = this.state;
      const { search } = this.props;
      if (radioSelected === 'ingredient') {
        const ingredientResults = await getIngredient(search);

        this.handleResultMeals(ingredientResults);
        this.mealsRedirect(ingredientResults);
      } else if (radioSelected === 'name-search') {
        const nameResults = await getName(search);

        this.handleResultMeals(nameResults);
        this.mealsRedirect(nameResults);
      } else if (radioSelected === 'first-letter') {
        const firstLetterResults = await getFirstLetter(search);

        this.handleResultMeals(firstLetterResults);
        this.mealsRedirect(firstLetterResults);
      }
    }
  };

  handleSubmitApi = async (event) => {
    this.pathMealsHandle();
    const { history } = this.props;
    event.preventDefault();
    if (history.location.pathname === '/drinks') {
      const { radioSelected } = this.state;
      const { search } = this.props;
      if (radioSelected === 'ingredient') {
        const drinkIngredientResults = await getDrinkIngredient(search);

        this.handleResultDrinks(drinkIngredientResults);
        this.drinksRedirect(drinkIngredientResults);
      } else if (radioSelected === 'name-search') {
        const drinkNameResults = await getDrinkName(search);

        this.handleResultDrinks(drinkNameResults);
        this.drinksRedirect(drinkNameResults);
      } else if (radioSelected === 'first-letter') {
        const drinkFirstLetterResults = await getDrinkFirstLetter(search);

        this.handleResultDrinks(drinkFirstLetterResults);
        this.drinksRedirect(drinkFirstLetterResults);
      }
    }
  };

  drinksRedirect = (qualquer) => {
    const { history } = this.props;
    if (qualquer && qualquer.drinks?.length === 1) {
      history.push(`/drinks/${qualquer.drinks[0].idDrink}`);
    }
  };

  mealsRedirect = (qualquer) => {
    const { history } = this.props;
    console.log('qualquer', qualquer);
    if (qualquer && qualquer.meals?.length === 1) {
      history.push(`/meals/${qualquer.meals[0].idMeal}`);
    }
  };

  handleResultMeals = (results) => {
    const { dispatch } = this.props;
    const itensList = 12;
    let listReturn = results?.meals;
    console.log('op', listReturn);

    if (listReturn && listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      dispatch(mealResults(listReturn));
    } else {
      return dispatch(mealResults(results?.meals));
    }
  };

  handleResultDrinks = (results) => {
    const { dispatch } = this.props;
    const itensList = 12;
    let listReturn = results?.drinks;

    if (listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      dispatch(drinkResults(listReturn));
    } else {
      return dispatch(drinkResults(results?.drinks));
    }
  };

  render() {
    const { radioSelected } = this.state;
    return (
      <>
        <label htmlFor="ingredient">
          Ingredient
          <input
            name="radios-group"
            value={ radioSelected }
            id="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="name-search">
          Name
          <input
            name="radios-group"
            value={ radioSelected }
            id="name-search"
            data-testid="name-search-radio"
            type="radio"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="first-letter">
          First letter
          <input
            name="radios-group"
            value={ radioSelected }
            id="first-letter"
            data-testid="first-letter-search-radio"
            type="radio"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ this.handleSubmitApi }
        >
          Search
        </button>
      </>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,

  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  search: globalState.searchValueReducer.search,
  // history: globalState.setHistoryReducer.history,
});

export default connect(mapStateToProps)(SearchBar);
