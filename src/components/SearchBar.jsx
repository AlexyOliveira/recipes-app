import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFirstLetter, getIngredient, getName } from '../services/api';

class SearchBar extends Component {
  state = {
    radioSelected: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      radioSelected: target.id,
    });
  };

  handleSubmitApi = async (event) => {
    event.preventDefault();
    const { radioSelected } = this.state;
    const { search } = this.props;
    if (radioSelected === 'ingredient') {
      await getIngredient(search);
    } else if (radioSelected === 'name-search') {
      await getName(search);
    } else if (radioSelected === 'first-letter') {
      console.log('opa');
      await getFirstLetter(search);
    }
  };

  render() {
    const { radioSelected } = this.state;
    return (
      <>
        <label htmlFor="ingredient">
          Ingredient
          <input
            name="radios-group"
            value={ radioSelected }
            id="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="name-search">
          Name
          <input
            name="radios-group"
            value={ radioSelected }
            id="name-search"
            data-testid="name-search-radio"
            type="radio"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="first-letter">
          First letter
          <input
            name="radios-group"
            value={ radioSelected }
            id="first-letter"
            data-testid="first-letter-search-radio"
            type="radio"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ this.handleSubmitApi }
        >
          Search
        </button>
      </>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  search: globalState.searchValueReducer.search,
  // history: globalState.setHistoryReducer.history,
});

export default connect(mapStateToProps)(SearchBar);
