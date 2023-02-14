import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { drinkResults, isLoading, pageTitle } from '../redux/actions';
import { getDrinkName, getDrinksbyFilter } from '../services/drinksAPI';
import { getDrinkCategories } from '../services/api';
import cocoa from '../images/cocoa.png';
import other from '../images/other.png';
import shake from '../images/shake.png';
import loadingGif from '../images/lo.gif';
import cocktail from '../images/cocktail.png';
import ordinaryDrink from '../images/ordinaryDrink.png';
import allDrink from '../images/allDrink.png';
import './meals.css';

class Drinks extends Component {
  state = {
    drinkCategories: [],
    isCategorieCliked: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pageTitle('Drinks'));
    dispatch(isLoading(true));
    const drinksReturn = await getDrinkName('');
    dispatch(isLoading(false));
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
    const { dispatch } = this.props;
    const { isCategorieCliked } = this.state;
    dispatch(isLoading(true));
    const filterReturn = await getDrinksbyFilter(target.name);
    dispatch(isLoading(false));
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
    const { dispatch } = this.props;
    dispatch(isLoading(true));
    const drinksReturn = await getDrinkName('');
    dispatch(isLoading(false));
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
    const { history, drinks, loading } = this.props;
    const { drinkCategories } = this.state;
    return (
      <div className="mealsContainer">
        <Header history={ history } />
        {
          loading ? <img className="loading" src={ loadingGif } alt="loading" /> : (
            <div>
              <div className="categories">
                <label htmlFor="allId">
                  <input
                    id="allId"
                    className="categorie"
                    type="image"
                    onClick={ this.handleAll }
                    data-testid="All-category-filter"
                    alt="all"
                    src={ allDrink }
                  />
                  <p>All</p>
                </label>
                {drinkCategories.map((categorie, index) => (
                  <label key={ index } htmlFor="id">
                    <input
                      id="id"
                      className="categorie"
                      data-testid={ `${categorie.strCategory}-category-filter` }
                      type="image"
                      src={ (() => {
                        switch (categorie.strCategory) {
                        case 'Ordinary Drink':
                          return ordinaryDrink;
                        case 'Cocktail':
                          return cocktail;
                        case 'Shake':
                          return shake;
                        case 'Other / Unknown':
                          return other;
                        case 'Cocoa':
                          return cocoa;
                        default:
                          return null;
                        }
                      })() }
                      key={ index }
                      name={ categorie.strCategory }
                      alt={ categorie.strCategory }
                      onClick={ this.handleCategorieClick }
                    />
                    <p>{categorie.strCategory}</p>
                  </label>
                ))}
              </div>
              <Recipes value={ drinks } />
            </div>
          )
        }

        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  // drinks: PropTypes.arrayOf.isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape({ strIBA: PropTypes.string }))
    .isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  drinks: globalState.drinkResultsReducer.drinks,
  // history: globalState.setHistoryReducer.history,
  loading: globalState.loadingReducer.loading,
});

export default connect(mapStateToProps)(Drinks);
