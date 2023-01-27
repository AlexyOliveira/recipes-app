import React, { Component } from 'react';

export class SearchBar extends Component {
  render() {
    return (
      <form>
        <label htmlFor="ingredient">
          Ingredientes
          <input id="ingredient" data-testid="ingredient-search-radio" type="radio" />
        </label>

        <label htmlFor="name-search">
          Nome
          <input id="name-search" data-testid="name-search-radio" type="radio" />
        </label>

        <label htmlFor="first-letter">
          Primeira Letra
          <input id="first-letter" data-testid="first-letter-search-radio" type="radio" />
        </label>

        <button data-testid="exec-search-btn">
          Submit
        </button>
      </form>
    );
  }
}

export default SearchBar;
