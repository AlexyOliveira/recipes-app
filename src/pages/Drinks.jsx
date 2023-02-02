import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { drinkResults, pageTitle } from '../redux/actions';
import { getDrinkName } from '../services/drinksAPI';

class Drinks extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(pageTitle('Drinks'));
    const drinksReturn = await getDrinkName('');
    this.handleResultDrinks(drinksReturn);
  }

  handleResultDrinks = (results) => {
    const { dispatch } = this.props;
    const itensList = 12;
    let listReturn = results.drinks;

    if (listReturn?.length > itensList) {
      listReturn = listReturn.slice(0, itensList);
      dispatch(drinkResults(listReturn));
    } else {
      return dispatch(drinkResults(results.drinks));
    }
  };

  render() {
    const { history, drinks } = this.props;
    return (
      <>
        <div>
          <Header history={ history } />
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
