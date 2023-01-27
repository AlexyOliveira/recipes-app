import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { pageTitle } from '../redux/actions';

class Drinks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Drinks'));
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <Header history={ history } />
        <div>Recipes</div>
      </>
    );
  }
}

Drinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Drinks);
