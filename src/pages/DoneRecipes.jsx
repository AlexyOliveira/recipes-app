import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';
import all from '../images/all.png';
import allDrink from '../images/allDrink.png';
import aall from '../images/aall.png';
import './doneRecipes.css';
import shareIcon from '../images/shareIcon.svg';

const fiveSeconds = 5000;

function DoneRecipes() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(pageTitle('Done Recipes'));
  }, [dispatch]);

  const [dones, setDones] = useState([]);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      setDones(JSON.parse(doneRecipes));
    }
  }, []);

  const clipBoardCopyUrl = (id, type) => {
    setCopiado(true);
    setTimeout(() => {
      setCopiado(false);
    }, fiveSeconds);
    const url = window.location.href.replace('/done-recipes', '');
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);
    console.log(type);
  };

  const handleAll = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      setDones(JSON.parse(doneRecipes));
    }
  };

  const handleMeals = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const donesJson = JSON.parse(doneRecipes);
      const doneMeals = donesJson.filter(
        (favorite) => favorite.type === 'meal',
      );
      setDones(doneMeals);
    }
  };

  const handleDrinks = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const donesJson = JSON.parse(doneRecipes);
      const doneDrinks = donesJson.filter(
        (favorite) => favorite.type === 'drink',
      );
      setDones(doneDrinks);
    }
  };

  return (
    <div style={ { background: 'whitesmoke' } }>
      <Header history={ history } />
      <div className="doneContainer">
        <div className="done-categories">
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
        <div className="done-cards-container">
          {dones.map((card, index) => (
            <div key={ index } className=" doneCard">
              {' '}
              <Link id="imagem" to={ `/${card.type}s/${card.id}` }>
                <img
                  className="doneImg"
                  id="img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ card.image }
                  alt={ card.img }
                />
              </Link>
              <div className="doneInfo">
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
                <Link className="cardType" to={ `/${card.type}s/${card.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{card.name}</p>
                </Link>
                <div>
                  {card.tags.map((tag) => (
                    <span
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  Done in:
                  {' '}
                  {(() => {
                    const date = card.doneDate.split('T')[0].split('-');
                    return `${date[2]}-${date[1]}-${date[0]}`;
                  })()}
                </p>
              </div>
              <button
                className="btn btn-warning"
                onClick={ () => clipBoardCopyUrl(card.id, card.type) }
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
              >
                <img src={ shareIcon } alt="" />
              </button>
              {copiado && <p className="copied">Link copied!</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// DoneRecipes.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   //   history: PropTypes.shape({
//   //     push: PropTypes.func,
//   //   }).isRequired,
// };

export default DoneRecipes;
