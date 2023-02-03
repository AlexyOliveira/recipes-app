import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  pageTitle('Profile');

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user && user.email;
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header
        title="Profile"
      />
      <section className="section">
        <p
          data-testid="profile-email"
        >
          {email}
        </p>
        <Link to="/done-recipes">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
