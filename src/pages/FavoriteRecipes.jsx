import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageTitle } from '../redux/actions';
import FavoriteCards from '../components/FavoriteCards';
import Header from '../components/Header';
import './favoriteRecipes.css';

class FavoriteRecipes extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Favorites'));
  }

  render() {
    const { history } = this.props;
    return (
      <div className="favContainer">
        <Header history={ history } />
        <div className="cardsContainer">
          <FavoriteCards />
        </div>
      </div>

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
