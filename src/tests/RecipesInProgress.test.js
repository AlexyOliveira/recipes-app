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
const recipeTitle = 'recipe-title';
const recipePhoto = 'recipe-photo';
const rotaDrinks = '/drinks/178319/in-progress';
const finishRecipe = 'finish-recipe-btn';

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
    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
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
      history.push(rotaDrinks);
    });
    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
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
      history.push(rotaDrinks);
    });
    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
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
      history.push(rotaDrinks);
    });
    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
    expect(photo).toBeInTheDocument();

    const shareBtn = await waitFor(() => screen.getByTestId('share-btn'));
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });

  it('Verifica se inicialmente o botao de finalizar receita esta desabilitado', async () => {
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(rotaDrinks);
    });
    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
    expect(photo).toBeInTheDocument();

    const finishBtn = await waitFor(() => screen.getByTestId(finishRecipe));
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toBeDisabled();

    const checkboxes = await waitFor(() => screen.getAllByRole('checkbox'));

    checkboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    expect(finishBtn).not.toBeDisabled();
  });

  it('Verifica se eh possivel finalizar uma receita', async () => {
    const inProgress = {
      drinks: {
        178319: [
          'Hpnotiq',
          'Pineapple Juice',
          'Banana Liqueur',
        ],
      },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(rotaDrinks);
    });

    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
    expect(photo).toBeInTheDocument();

    const finishBtn = await waitFor(() => screen.getByTestId(finishRecipe));
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
  });

  it('Verifica se eh possivel acessar a tela de receitas feitas', async () => {
    const doneRecipes = [
      {
        id: '52977',
        type: 'meal',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        nationality: 'Turkish',
        doneDate: '2023-02-06T07:14:01.377Z',
        tags: [
          'Soup',
        ],
      },
    ];

    const inProgress = {
      drinks: {
        178319: [
          'Hpnotiq',
          'Pineapple Juice',
          'Banana Liqueur',
        ],
      },
      meals: {},
    };

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push(rotaDrinks);
    });

    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
    expect(photo).toBeInTheDocument();

    const finishBtn = await waitFor(() => screen.getByTestId(finishRecipe));
    expect(finishBtn).toBeInTheDocument();

    userEvent.click(finishBtn);

    const doneBtn = await waitFor(() => screen.getByTestId('profile-top-btn'));
    expect(doneBtn).toBeInTheDocument();
  });

  it('Verifica se eh possivel acessar a tela de receitas favoritas na tela meals', async () => {
    const progress = {
      meals: {
        52977: [
          'Lentils',
          'Onion',
          'Carrots',
          'Tomato Puree',
          'Cumin',
          'Paprika',
          'Mint',
          'Thyme',
          'Black Pepper',
          'Red Pepper Flakes',
          'Vegetable Stock',
          'Water',
          'Sea Salt',
        ],
      },
      drinks: {},
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/meals/52977/in-progress');
    });

    const title = await waitFor(() => screen.getByTestId(recipeTitle));
    expect(title).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    const photo = await waitFor(() => screen.getByTestId(recipePhoto));
    expect(photo).toBeInTheDocument();

    const finishBtn = await waitFor(() => screen.getByTestId(finishRecipe));
    expect(finishBtn).toBeInTheDocument();

    userEvent.click(finishBtn);

    const doneBtn = await waitFor(() => screen.getByTestId('profile-top-btn'));
    expect(doneBtn).toBeInTheDocument();
  });
});
