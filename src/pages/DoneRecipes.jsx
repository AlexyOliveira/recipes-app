import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { pageTitle } from '../redux/actions';
import Header from '../components/Header';

import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const dispatch = useDispatch();

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

  const clipBoardCopyUrl = (id, cardType) => {
    setCopiado(true);
    const url = window.location.href;
    const urlSplit = url.split('/');
    const urlWithId = `${urlSplit[0]}//${urlSplit[2]}/${cardType}s/${id}`;

    navigator.clipboard.writeText(urlWithId);
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
      const doneMeals = donesJson.filter((favorite) => favorite.type === 'meal');
      setDones(doneMeals);
    }
  };

  const handleDrinks = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const donesJson = JSON.parse(doneRecipes);
      const doneDrinks = donesJson.filter((favorite) => favorite.type === 'drink');
      setDones(doneDrinks);
    }
  };

  return (
    <>
      {console.log(dones)}
      <Header />
      <div>
        <div>
          <button
            onClick={ handleAll }
            data-testid="filter-by-all-btn"
            type="button"
          >
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
          {dones.map((card, index) => (
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
                {card.doneDate}
              </p>
              <button
                onClick={ () => clipBoardCopyUrl(card.id, card.type) }
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
              >
                <img src={ shareIcon } alt="" />
              </button>
              {copiado && <p>Link copied!</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// DoneRecipes.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   //   history: PropTypes.shape({
//   //     push: PropTypes.func,
//   //   }).isRequired,
// };

export default DoneRecipes;
