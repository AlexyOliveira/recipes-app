import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';

const textDeco = 'text-decoration: line-through solid rgb(0, 0, 0)';

describe('Testando o componente RecipeDetails', () => {
  beforeEach(() => {
    // make 2 fetches , oneDrink and mealIngredients
    global.fetch = jest.fn((url) => {
      if (url.includes('themealdb.com/api/json/v1/1/lookup.php')) {
        console.log('url', url);
        return Promise.resolve({
          json: () => Promise.resolve(oneMeal),
        });
      }
      if (url.includes('thecocktaildb.com/api/json/v1/1/lookup.php')) {
        return Promise.resolve({
          json: () => Promise.resolve(oneDrink),
        });
      }
      if (url.includes('thecocktaildb.com/api/json/v1/1/search')) {
        return Promise.resolve({
          json: () => Promise.resolve(drinkIngredients),
        });
      }
      if (url.includes('themealdb.com/api/json/v1/1/search')) {
        return Promise.resolve({
          json: () => Promise.resolve(mealIngredients),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Verifica se o botao favorito eh verificado se houver algo no LocalStorage', async () => {
    const favStorage = {
      id: '52771',
      type: 'meal',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      nationality: 'Italian',
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([favStorage]));

    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/52771/in-progress');
    });
    const title = await waitFor(() => screen.getByTestId('recipe-title'));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId('recipe-photo'));
    expect(photo).toBeInTheDocument();
  });

  it('Verifica se eh possivel clicar nos checkbox e checa qual seu estilo', async () => {
    const inProgressStorage = {
      drinks: {
        178319: [],
      },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));

    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/178319/in-progress');
    });
    const title = await waitFor(() => screen.getByTestId('recipe-title'));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId('recipe-photo'));
    expect(photo).toBeInTheDocument();

    const checkboxes = await waitFor(() => screen.getAllByRole('checkbox'));
    expect(checkboxes).toHaveLength(3);

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    const getIngredStep0 = await waitFor(() => screen.getByTestId('0-ingredient-step'));
    const getIngredStep1 = await waitFor(() => screen.getByTestId('1-ingredient-step'));
    const getIngredStep2 = await waitFor(() => screen.getByTestId('2-ingredient-step'));

    expect(getIngredStep0).toHaveStyle(textDeco);
    expect(getIngredStep1).toHaveStyle(textDeco);
    expect(getIngredStep2).toHaveStyle(textDeco);

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });

    expect(getIngredStep0).not.toHaveStyle(textDeco);
    expect(getIngredStep1).not.toHaveStyle(textDeco);
    expect(getIngredStep2).not.toHaveStyle(textDeco);
  });

  it('Verifica se eh possivel favoritar uma receita', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/178319/in-progress');
    });
    const title = await waitFor(() => screen.getByTestId('recipe-title'));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId('recipe-photo'));
    expect(photo).toBeInTheDocument();

    const favoriteBtn = await waitFor(() => screen.getByTestId('favorite-btn'));
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);

    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteStorage).toHaveLength(1);
    expect(favoriteStorage[0].id).toBe('178319');

    userEvent.click(favoriteBtn);
    expect(favoriteStorage).toHaveLength(0);
  });

  it('Verifica se eh possivel compartilhar uma receita', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/178319/in-progress');
    });
    const title = await waitFor(() => screen.getByTestId('recipe-title'));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId('recipe-photo'));
    expect(photo).toBeInTheDocument();

    const shareBtn = await waitFor(() => screen.getByTestId('share-btn'));
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
});
