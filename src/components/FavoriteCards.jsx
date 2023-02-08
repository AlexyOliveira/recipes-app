import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import all from '../images/all.png';
import allDrink from '../images/allDrink.png';
import aall from '../images/aall.png';
import './favoriteCards.css';

function FavoriteCards() {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);
  const [copiado, setCopiado] = useState(false);
  console.log(isFavorite);
  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      setFavorites(JSON.parse(favoriteRecipes));
    }
  }, []);

  const clipBoardCopyUrl = (id, cardType) => {
    setCopiado(true);
    const url = window.location.href;
    const urlSplit = url.split('/');
    const urlWithId = `${urlSplit[0]}//${urlSplit[2]}/${cardType}s/${id}`;

    navigator.clipboard.writeText(urlWithId);
  };

  const unFavorite = (id) => {
    setIsFavorite(false);

    const fg = favorites.filter((favorite) => favorite.id !== id);
    console.log(fg);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fg));
    setFavorites(fg);
  };

  const handleAll = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      setFavorites(JSON.parse(favoriteRecipes));
    }
  };

  const handleMeals = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      const favoritesJson = JSON.parse(favoriteRecipes);
      const favoriteMeals = favoritesJson.filter(
        (favorite) => favorite.type === 'meal',
      );
      setFavorites(favoriteMeals);
    }
  };

  const handleDrinks = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      const favoritesJson = JSON.parse(favoriteRecipes);
      const favoriteMeals = favoritesJson.filter(
        (favorite) => favorite.type === 'drink',
      );
      setFavorites(favoriteMeals);
    }
  };

  return (
    <div>
      <div className="favCategories">
        <label htmlFor="allId">
          <input
            id="allId"
            className="categorie"
            type="image"
            onClick={ handleAll }
            src={ aall }
            alt="all"
            data-testid="filter-by-all-btn"
          />
          <p>All</p>
        </label>
        <label htmlFor="allId">
          <input
            id="allId"
            className="categorie"
            type="image"
            onClick={ handleMeals }
            data-testid="filter-by-meal-btn"
            alt="all"
            src={ all }
          />
          <p>Meals</p>
        </label>

        <label htmlFor="allDrinkId">
          <input
            id="allDrinkId"
            className="categorie"
            type="image"
            onClick={ handleDrinks }
            data-testid="filter-by-drink-btn"
            alt="all"
            src={ allDrink }
          />
          <p>Drinks</p>
        </label>
      </div>

      {favorites.map((card, index) => (
        <div key={ index } className="favCard">
          {' '}
          <Link id="imagem" to={ `/${card.type}s/${card.id}` }>
            <div className="cardImg">
              <img
                id="img"
                data-testid={ `${index}-horizontal-image` }
                src={ card.image }
                alt={ card.img }
              />
            </div>
          </Link>
          <div className="favInfo">
            <h2 data-testid={ `${index}-horizontal-top-text` }>
              {card.type === 'drink'
                ? card.category
                : `${card.nationality} - ${card.category}`}
            </h2>
            <div>
              {card.type === 'drink' && (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {card.alcoholicOrNot}
                </p>
              )}
              <Link className="favLink" to={ `/${card.type}s/${card.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{card.name}</p>
              </Link>
            </div>
            <div
              className="shareAndLike"
              onClick={ () => clipBoardCopyUrl(card.id, card.type) }
              data-testid={ `${index}-horizontal-share-btn` }
              onKeyDown={ (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  clipBoardCopyUrl();
                }
              } }
              tabIndex={ 0 }
              role="button"
            >
              <i className="fa-solid fa-share-from-square shareButton" />

              {copiado && <p>Link copied!</p>}
              <div
                onClick={ () => unFavorite(card.id) }
                data-testid={ `${index}-horizontal-favorite-btn` }
                onKeyDown={ (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    unFavorite();
                  }
                } }
                tabIndex={ 0 }
                role="button"
              >
                <i className="fa-solid fa-heart solidHeart" />
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default FavoriteCards;
