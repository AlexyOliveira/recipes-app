import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
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

        <div>
          {meals.map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt=""
              />
              <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
            </div>
          ))}

        </div>
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
