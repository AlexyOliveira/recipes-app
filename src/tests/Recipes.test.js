import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';
// const pushToPage = async (pathname) => {
//   act(() => {
//     history.push(pathname);
//   });
// };
describe('Testa a página Recipes.', () => {
  /// //DRINKS
  it(
    'Verifica se os primeiros 5 filtros do array retornado da API (drinks).',
    async () => {
      const { history } = renderWithRouter(<App />);
      // const pushToDrinks = () => pushToPage('/drinks');
      act(() => {
        history.push('/drinks');
      });
      // pushToPage('/drinks');
      await waitFor(() => {
        expect(history.location.pathname).toBe('/drinks');
      });
      const allBtn = screen.getByRole('button', { name: /all/i });
      const ordinary = await screen.findByRole('button', { name: /ordinary drink/i });
      const cocktail = await screen.findByRole('button', { name: /cocktail/i });
      const shake = await screen.findByRole('button', { name: /shake/i });
      const other = await screen.findByRole('button', { name: /other \/ unknown/i });
      const cocoa = await screen.findByRole('button', { name: /cocoa/i });
      expect(allBtn).toBeInTheDocument();
      expect(ordinary).toBeInTheDocument();
      expect(cocktail).toBeInTheDocument();
      expect(shake).toBeInTheDocument();
      expect(other).toBeInTheDocument();
      expect(cocoa).toBeInTheDocument();
      await waitFor(() => userEvent.click(ordinary));
      userEvent.click(ordinary);
    },
  );
  it('Verifica a funcionalidade dos botões de filtro (drinks).', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const ordinary = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(allBtn).toBeInTheDocument();
    expect(ordinary).toBeInTheDocument();
    userEvent.click(ordinary);
    const ordinaryRecipe = await screen.findByRole('heading', { name: /3-mile long island iced tea/i });
    expect(ordinaryRecipe).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstAllRecipe = await screen.findByTestId('0-recipe-card');
    await waitFor(() => {
      expect(firstAllRecipe).toBeInTheDocument();
    });
    userEvent.click(firstAllRecipe);
  });
  // /// //MEALS
  it(
    'Verifica se os primeiros 5 filtros do array retornado da API (meals).',
    async () => {
      const { history } = renderWithRouter(<App />);
      // const pushToDrinks = () => pushToPage('/drinks');
      act(() => {
        history.push('/meals');
      });
      // pushToPage('/drinks');
      await waitFor(() => {
        expect(history.location.pathname).toBe('/meals');
      });
      const allBtn = screen.getByRole('button', { name: /all/i });
      const beef = await screen.findByRole('button', { name: /beef/i });
      const breakfast = await screen.findByRole('button', { name: /breakfast/i });
      const chicken = await screen.findByRole('button', { name: /chicken/i });
      const dessert = await screen.findByRole('button', { name: /dessert/i });
      const goat = await screen.findByRole('button', { name: /goat/i });
      expect(allBtn).toBeInTheDocument();
      expect(beef).toBeInTheDocument();
      expect(breakfast).toBeInTheDocument();
      expect(chicken).toBeInTheDocument();
      expect(dessert).toBeInTheDocument();
      expect(goat).toBeInTheDocument();
    },
  );
  it('Verifica a funcionalidade dos botões de filtro (meals).', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const beef = await screen.findByRole('button', { name: /beef/i });
    expect(allBtn).toBeInTheDocument();
    expect(beef).toBeInTheDocument();
    userEvent.click(beef);
    const ordinaryRecipe = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(ordinaryRecipe).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstAllRecipe = await screen.findByRole('heading', { name: /corba/i });
    await waitFor(() => {
      expect(firstAllRecipe).toBeInTheDocument();
    });
  });
});
