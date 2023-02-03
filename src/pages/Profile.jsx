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
        <Header
          title="Profile"
        />
        <section className="section">
          <p data-testid="profile-email">Email</p>
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
          >
            Logout
          </button>
        </section>

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
