import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { searchValue } from '../redux/actions';

class Header extends Component {
  state = {
    searchInput: false,
    searchChange: '',
  };

  handleProfileSubmit = () => {
    const { history } = this.props;
    history.push('/profile');
  };

  handleSearchSubmit = () => {
    const { searchInput } = this.state;
    this.setState({
      searchInput: !searchInput,
    });
  };

  render() {
    const { title, dispatch } = this.props;
    const { searchInput, searchChange } = this.state;
    // console.log(search)
    return (
      <div>
        <h1 data-testid="page-title">{title}</h1>
        <button type="button" onClick={ this.handleProfileSubmit }>
          <img data-testid="profile-top-btn" src={ profile } alt="profile-icon" />
        </button>
        {title !== 'Profile'
          && title !== 'Favorite Recipes'
          && title !== 'Done Recipes'
          && (
            <form>
              <SearchBar />
              <button
                type="button"
                onClick={ this.handleSearchSubmit }
              >
                <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
              </button>
            </form>
          )}
        {searchInput && <input
          value={ searchChange }
          onChange={ ({ target }) => this.setState({
            searchChange: target.value,
          }, () => dispatch(searchValue(target.value))) }
          data-testid="search-input"
          type="text"
        />}
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  title: globalState.titlePageReducer.title,
  search: globalState.searchValueReducer.search,
  // history: globalState.setHistoryReducer.history,
});

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
