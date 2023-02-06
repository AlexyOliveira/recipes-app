import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { drinkResults, pageTitle } from '../redux/actions';
import { getDrinkName, getDrinksbyFilter } from '../services/drinksAPI';
import { getDrinkCategories } from '../services/api';

class Drinks extends Component {
  state = {
    drinkCategories: [],
    isCategorieCliked: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pageTitle('Drinks'));
    const drinksReturn = await getDrinkName('');
    this.handleResultDrinks(drinksReturn.drinks);
    this.drinkCategories();
  }

  drinkCategories = async () => {
    const categoriesReturn = await getDrinkCategories();
    this.drinkCategoriesSlicetoFive(categoriesReturn);
  };

  drinkCategoriesSlicetoFive = (results) => {
    const itensList = 5;
    let listReturn = results;

    if (listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      this.setState({
        drinkCategories: listReturn,
      });
    } else {
      this.setState({
        drinkCategories: results,
      });
    }
  };

  handleCategorieClick = async ({ target }) => {
    const { isCategorieCliked } = this.state;
    const filterReturn = await getDrinksbyFilter(target.name);
    this.handleResultDrinks(filterReturn);
    this.setState({
      isCategorieCliked: target.name,
    });
    if (isCategorieCliked === target.name) {
      const drinksReturn = await getDrinkName('');
      this.handleResultDrinks(drinksReturn.drinks);
      this.setState({
        isCategorieCliked: '',
      });
    }
  };

  handleAll = async () => {
    const drinksReturn = await getDrinkName('');
    this.handleResultDrinks(drinksReturn.drinks);
    this.setState({
      isCategorieCliked: '',
    });
  };

  handleResultDrinks = (results) => {
    const { dispatch } = this.props;
    const itensList = 12;
    let listReturn = results;

    if (listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      dispatch(drinkResults(listReturn));
    } else {
      return dispatch(drinkResults(results));
    }
  };

  render() {
    const { history, drinks } = this.props;
    const { drinkCategories } = this.state;
    return (
      <>
        <div>
          <Header history={ history } />
          <button
            onClick={ this.handleAll }
            data-testid="All-category-filter"
            type="button"
          >
            All
          </button>
          {drinkCategories.map((categorie, index) => (
            <button
              data-testid={ `${categorie.strCategory}-category-filter` }
              type="button"
              key={ index }
              name={ categorie.strCategory }
              onClick={ this.handleCategorieClick }
            >
              {categorie.strCategory}
            </button>
          ))}
          <Recipes value={ drinks } />
        </div>
        <Footer />
      </>
    );
  }
}

Drinks.propTypes = {
  // drinks: PropTypes.arrayOf.isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape({ strIBA: PropTypes.string })).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  drinks: globalState.drinkResultsReducer.drinks,
  // history: globalState.setHistoryReducer.history,
});

export default connect(mapStateToProps)(Drinks);
