import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './meals.css';
import beef from '../images/beef.png';
import goat from '../images/goat.png';
import chicken from '../images/chicken.png';
import breakFast from '../images/breakFast.png';
import dessert from '../images/dessert.png';
import all from '../images/all.png';
import loadingGif from '../images/lo.gif';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { isLoading, mealResults, pageTitle } from '../redux/actions';
import { getMealCategories, getMealsbyFilter, getName } from '../services/api';

class Meals extends Component {
  state = {
    mealsCategories: [],
    isCategorieCliked: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pageTitle('Meals'));
    dispatch(isLoading(true));
    const mealsReturn = await getName('');
    dispatch(isLoading(false));
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
    const { dispatch } = this.props;
    const { isCategorieCliked } = this.state;
    dispatch(isLoading(true));
    const filterReturn = await getMealsbyFilter(target.name);
    dispatch(isLoading(false));
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
    const { dispatch } = this.props;
    dispatch(isLoading(true));
    const mealsReturn = await getName('');
    dispatch(isLoading(false));
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
    const { history, meals, loading } = this.props;
    const { mealsCategories } = this.state;
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
                    src={ all }
                  />
                  <p>All</p>
                </label>
                {mealsCategories.map((categorie, index) => (
                  <label key={ index } htmlFor="id">
                    <input
                      id="id"
                      className="categorie"
                      data-testid={ `${categorie.strCategory}-category-filter` }
                      type="image"
                      src={ (() => {
                        switch (categorie.strCategory) {
                        case 'Beef':
                          return beef;
                        case 'Goat':
                          return goat;
                        case 'Chicken':
                          return chicken;
                        case 'Breakfast':
                          return breakFast;
                        case 'Dessert':
                          return dessert;
                        default:
                          return null;
                        }
                      })() }
                      key={ index }
                      onClick={ this.handleCategorieClick }
                      name={ categorie.strCategory }
                      alt={ categorie.strCategory }
                    />
                    <p>{categorie.strCategory}</p>
                  </label>
                ))}
              </div>
              <Recipes value={ meals } />

            </div>)

        }

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (globalState) => ({
  meals: globalState.mealResultsReducer.meals,
  loading: globalState.loadingReducer.loading,
});
Meals.propTypes = {
  loading: PropTypes.bool.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({ strArea: PropTypes.string }))
    .isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(Meals);
