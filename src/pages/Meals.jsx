import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { mealResults, pageTitle } from '../redux/actions';
import { getName } from '../services/api';

class Meals extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Meals'));
    const mealsReturn = await getName('');
    this.handleResultMeals(mealsReturn);
  }

  handleResultMeals = (results) => {
    const { dispatch } = this.props;
    const itensList = 12;
    let listReturn = results.meals;

    if (listReturn.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      dispatch(mealResults(listReturn));
    } else {
      return dispatch(mealResults(results.meals));
    }
  };

  render() {
    const { history, meals } = this.props;
    console.log('primeiro');
    return (
      <>
        <Header history={ history } />
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
