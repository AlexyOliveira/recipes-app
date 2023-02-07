import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageTitle } from '../redux/actions';
import FavoriteCards from '../components/FavoriteCards';
import Header from '../components/Header';

class FavoriteRecipes extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Favorite Recipes'));
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <Header history={ history } />
        <div>
          <FavoriteCards />
        </div>
      </>

    );
  }
}

FavoriteRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(FavoriteRecipes);
