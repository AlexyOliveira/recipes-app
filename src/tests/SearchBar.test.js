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

const searchTestId = 'search-top-btn';
const inputTestId = 'search-input';
const nameRadioTestId = 'name-search-radio';
const btnPesquisarTestId = 'exec-search-btn';
const firstLetterTesteId = 'first-letter-search-radio';

describe('Testando o componente SearchBar', () => {
  it('Verifica se o fetch é feito após clicar no botão', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const ingridentRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    expect(inputSearch).toBeInTheDocument();
    expect(ingridentRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnPesquisar).toBeInTheDocument();

    userEvent.type(inputSearch, 'rice');
    userEvent.click(ingridentRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();
  });
});

describe('Testando o componente SearchBar', () => {
  it('Verifica se o fetch é feito após clicar no botão', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const ingridentRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    expect(inputSearch).toBeInTheDocument();
    expect(ingridentRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnPesquisar).toBeInTheDocument();

    userEvent.type(inputSearch, 'gin tonic');
    userEvent.click(nameRadio);
    userEvent.click(btnPesquisar);

    expect(history.location.pathname).toBe('/drinks');
    expect(fetch).toHaveBeenCalled();
  });
  it('testando se renderiza para pagina de 1 drink só', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId(inputTestId);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(btnPesquisar);

    await screen.findByText(/recipedetails/i);

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('testando se renderiza para pagina de 1 meals só', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(btnPesquisar);

    await screen.findByText(/recipedetails/i);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('testando se aparece a alert Meals', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);
    //
    const inputSearch = screen.getByTestId(inputTestId);
    const letter = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);
    //
    userEvent.type(inputSearch, 'aa');
    userEvent.click(letter);
    userEvent.click(btnPesquisar);

    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });
  });

  it('testando se aparece a alert Drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const letter = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    userEvent.type(inputSearch, 'Aa');
    userEvent.click(letter);
    userEvent.click(btnPesquisar);

    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });
  });
});
