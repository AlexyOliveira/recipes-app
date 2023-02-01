import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { pageTitle } from '../redux/actions';

class Meals extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Meals'));
  }

  render() {
    const { history, meals } = this.props;
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
