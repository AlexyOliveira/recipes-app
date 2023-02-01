import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { pageTitle } from '../redux/actions';

const alexandre = 'ok';
console.log(alexandre);

class Drinks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Drinks'));
  }

  render() {
    const { history, drinks } = this.props;
    console.log(drinks);
    return (
      <>
        <Header history={ history } />
        <div>
          {drinks.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt=""
              />
              <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
            </div>
          ))}
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
