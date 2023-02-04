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

const photoxx = 'recipe-photo';
const theMeals = '/meals/52977';
const sutato = 'start-recipe-btn';
const feiborito = 'favorite-btn';
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
      history.push(theMeals);
    });
    const title = await waitFor(() => screen.getByTestId('recipe-title'));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
  });
  it('Verifica se eh possivel favoritar uma receita', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const favoriteBtn = await waitFor(() => screen.getByTestId(feiborito));
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
  });
  it('Verifica se eh possivel favoritar uma receita 2', async () => {
    const savedRecipes = [
      {
        id: '53060',
        type: 'meal',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        nationality: 'Croatian',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedRecipes));
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const favoriteBtn = await waitFor(() => screen.getByTestId(feiborito));
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
  });
  it('Verifica se eh possivel compartilhar uma receita', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const shareBtn = await waitFor(() => screen.getByTestId('share-btn'));
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
  it('Verifica se eh possivel iniciar a receita na tela de comidas', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const startBtn = await waitFor(() => screen.getByTestId(sutato));
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
  });
  it('Verifica se o texto da receita eh Start Recipe', async () => {
    localStorage.clear();
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const startBtn = await waitFor(() => screen.getByTestId(sutato));
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveTextContent('Start Recipe');
  });
  it('Verifica se o texto da receita eh Resume Recipe', async () => {
    const startedRecipe = {
      drinks: {},
      meals: {
        52977: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipe));
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const startBtn = await waitFor(() => screen.getByTestId(sutato));
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveTextContent('Continue Recipe');
  });
  it('Verifica se o botao de favoritar eh preto', async () => {
    const favoriteRecipes = [
      {
        id: '52977',
        type: 'meal',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        nationality: 'Turkish',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(theMeals);
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const favoriteBtn = await waitFor(() => screen.getByTestId(feiborito));
    expect(favoriteBtn).toBeInTheDocument();
  });
  it('Inicia a receita na pagina de drinks', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/15997');
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const startBtn = await waitFor(() => screen.getByTestId(sutato));
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
  });
  it('Verifica se o texto da receita eh Start Recipe na pagina de drinks', async () => {
    localStorage.clear();
    const startedRecipe = {
      drinks: {
        15997: [],
      },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipe));
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/15997');
    });
    const photo = await waitFor(() => screen.getByTestId(photoxx));
    expect(photo).toBeInTheDocument();
    const startBtn = await waitFor(() => screen.getByTestId(sutato));
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveTextContent('Continue Recipe');
  });
});
