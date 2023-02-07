import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <button onClick={ handleAll } data-testid="filter-by-all-btn" type="button">
        All
      </button>
      <button
        onClick={ handleMeals }
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        onClick={ handleDrinks }
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      {favorites.map((card, index) => (
        <div style={ { width: '400px' } } key={ index } className="card">
          {' '}
          <Link id="imagem" to={ `/${card.type}s/${card.id}` }>
            <img
              id="img"
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '400px' } }
              src={ card.image }
              alt={ card.img }
            />
          </Link>
          <h2 data-testid={ `${index}-horizontal-top-text` }>
            {card.type === 'drink'
              ? card.category
              : `${card.nationality} - ${card.category}`}
          </h2>
          {card.type === 'drink' && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {card.alcoholicOrNot}
            </p>
          )}
          <Link to={ `/${card.type}s/${card.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{card.name}</p>
          </Link>
          <div
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
          </div>
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
      ))}
    </div>
  );
}

export default FavoriteCards;
