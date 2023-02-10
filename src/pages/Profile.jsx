import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logOut from '../images/e.png';
import done from '../images/d.png';
import heart from '../images/h.png';
import './profile.css';

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageTitle('Profile'));
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user && user.email;

  return (
    <>
      <Header
        title="Profile"
      />
      <section className="section profileContainer">
        <p
          data-testid="profile-email"
        >
          {email}
        </p>
        <div className="links">
          <Link className="link" to="/done-recipes">
            <img className="profileDone" src={ done } alt="done" />
            <button
              className="btn"
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </button>
          </Link>

          <Link className="link" to="/favorite-recipes">
            <img className="profileHeart" src={ heart } alt="heart" />
            <button
              className="btn"
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link className="link" to="/">
            <img className="profileLogOut" src={ logOut } alt="logOut" />
            <button
              className="btn"
              data-testid="profile-logout-btn"
              type="button"
            >
              Logout
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
