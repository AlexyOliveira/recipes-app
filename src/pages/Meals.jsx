import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { mealResults, pageTitle } from '../redux/actions';
import { getMealCategories, getMealsbyFilter, getName } from '../services/api';

class Meals extends Component {
  state = {
    mealsCategories: [],
    isCategorieCliked: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pageTitle('Meals'));
    const mealsReturn = await getName('');
    this.handleResultMeals(mealsReturn.meals);
    this.mealCategories();
  }

  mealCategories = async () => {
    const categoriesReturn = await getMealCategories();
    this.mealCategoriesSlicetoFive(categoriesReturn);
  };

  mealCategoriesSlicetoFive = (results) => {
    const itensList = 5;
    let listReturn = results;

    if (listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      this.setState({
        mealsCategories: listReturn,
      });
    } else {
      this.setState({
        mealsCategories: results,
      });
    }
  };

  handleCategorieClick = async ({ target }) => {
    const { isCategorieCliked } = this.state;
    const filterReturn = await getMealsbyFilter(target.name);
    this.handleResultMeals(filterReturn);
    this.setState({
      isCategorieCliked: target.name,
    });
    if (isCategorieCliked === target.name) {
      const mealsReturn = await getName('');
      this.handleResultMeals(mealsReturn.meals);
      this.setState({
        isCategorieCliked: '',
      });
    }
  };

  handleAll = async () => {
    const mealsReturn = await getName('');
    this.handleResultMeals(mealsReturn.meals);
    this.setState({
      isCategorieCliked: '',
    });
  };

  handleResultMeals = (results) => {
    const { dispatch } = this.props;
    const itensList = 12;
    let listReturn = results;

    if (listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      dispatch(mealResults(listReturn));
    } else {
      return dispatch(mealResults(results));
    }
  };

  render() {
    const { history, meals } = this.props;
    const { mealsCategories } = this.state;
    return (
      <>
        <Header history={ history } />
        <button
          onClick={ this.handleAll }
          data-testid="All-category-filter"
          type="button"
        >
          All
        </button>
        {mealsCategories.map((categorie, index) => (
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            key={ index }
            onClick={ this.handleCategorieClick }
            name={ categorie.strCategory }
          >
            {categorie.strCategory}
          </button>
        ))}
        <Recipes value={ meals } />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  meals: globalState.mealResultsReducer.meals,
  // history: globalState.setHistoryReducer.history,
});

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({ strArea: PropTypes.string })).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Meals);
