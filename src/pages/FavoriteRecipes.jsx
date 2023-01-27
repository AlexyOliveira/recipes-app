import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';

class FavoriteRecipes extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Favorite Recipes'));
  }

  render() {
    return (
      <>
        <Header />
        <div>FavoriteRecipes</div>
      </>

    );
  }
}

FavoriteRecipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
};

export default connect()(FavoriteRecipes);
