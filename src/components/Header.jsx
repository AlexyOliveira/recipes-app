import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { searchValue, globalStateHistory } from '../redux/actions';
import './header.css';
import recipesApp from '../images/recipesApp.png';

class Header extends Component {
  state = {
    searchInput: false,
    searchChange: '',
  };

  componentDidMount() {
    const { history, dispatch } = this.props;
    dispatch(globalStateHistory(history));
  }

  handleProfileSubmit = () => {
    const { history } = this.props;
    history?.push('/profile');
  };

  handleSearchSubmit = () => {
    const { searchInput } = this.state;
    this.setState({
      searchInput: !searchInput,
    });
  };

  render() {
    const { title, dispatch, history } = this.props;
    const { searchInput, searchChange } = this.state;
    return (
      <>
        <div className="headerContainer">
          <Link to="/meals">
            <img src={ recipesApp } alt="recipesApp" />
          </Link>

          <div className="profileAndSearchIcon">
            <input
              className="profileIcon"
              onClick={ this.handleProfileSubmit }
              type="image"
              src={ profile }
              name="profileIcon"
              data-testid="profile-top-btn"
              alt="profile-icon"
            />

            {title !== 'Profile'
              && title !== 'Favorite Recipes'
              && title !== 'Done Recipes'
              && (
                <input
                  onClick={ this.handleSearchSubmit }
                  type="image"
                  src={ searchIcon }
                  name="searchIcon"
                  data-testid="search-top-btn"
                  alt="search-icon"
                />
              )}
          </div>
        </div>

        <div className="titles">
          {
            (() => {
              if (
                title === 'Drinks'
              ) return <i className="fa-solid fa-martini-glass-citrus icon" />;
              if (title === 'Meals') return <i className="fa-solid fa-utensils icon" />;
              return null;
            })()
          }

          <h1 data-testid="page-title">{title}</h1>
        </div>

        {searchInput && (
          <div className="searchBar">
            <input
              className="searchInput"
              value={ searchChange }
              onChange={ ({ target }) => this.setState(
                {
                  searchChange: target.value,
                },
                () => dispatch(searchValue(target.value)),
              ) }
              data-testid="search-input"
              type="text"
            />
            <SearchBar history={ history } />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  title: globalState.titlePageReducer.title,
  search: globalState.searchValueReducer.search,
  // history: globalState.globalHistoryReducer.history,
});

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
