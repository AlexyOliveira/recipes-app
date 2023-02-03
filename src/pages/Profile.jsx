import React from 'react';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const dispatch = useDispatch();
  dispatch(pageTitle('Perfil'));

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : null;

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

export default Profile;
