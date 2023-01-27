import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { pageTitle } from '../redux/actions';

class Meals extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Meals'));
  }

  render() {
    return (
      <>
        <Header />

        <div>Meals</div>
      </>

    );
  }
}

Meals.propTypes = {
  dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
};

export default connect()(Meals);
