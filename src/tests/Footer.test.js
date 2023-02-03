import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando o componente Footer', () => {
  it('Verifica se os icones do Footer é renderizado corretamente para a rota meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    // const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnMeals = screen.getByRole('button', { name: /mealicon/i });
    userEvent.click(btnMeals);
    // userEvent.click(btnDrinks);
    expect(btnMeals).toBeInTheDocument();
    // expect(btnDrinks).toBeInTheDocument();
  });

  it('Verifica se os icones do Footer é renderizado corretamente para a rota drinks ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    // const btnMeals = screen.getByRole('button', { name: /mealicon/i });
    // userEvent.click(btnMeals);
    userEvent.click(btnDrinks);
    // expect(btnMeals).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });
});
