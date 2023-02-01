import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(pageTitle('Profile'));
  }

  render() {
    return (
      <>
        <Header />
        <div>Profile</div>
        <Footer />
      </>

    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
};

export default connect()(Profile);
