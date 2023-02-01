import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { pageTitle } from '../redux/actions';

class Drinks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Drinks'));
  }

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
