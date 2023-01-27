import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <div>
        <h1 data-testid="page-title">{title}</h1>
        <img data-testid="profile-top-btn" src={ profile } alt="" />
        {title !== 'Profile'
          && title !== 'Favorite Recipes'
          && title !== 'Done Recipes'
          && <img data-testid="search-top-btn" src={ searchIcon } alt="" />}
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  title: globalState.titlePageReducer.title,
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
