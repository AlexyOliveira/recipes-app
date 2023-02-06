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
  });

  it('Verifica se o fetch é feito após clicar no botão', async () => {
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
});
