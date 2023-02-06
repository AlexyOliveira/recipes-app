import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouterAndRedux';

describe('FavoriteCards component', () => {
  it('renders correctly', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const All = screen.getByRole('button', { name: /all/i });
    const meals = screen.getByRole('button', { name: /meals/i });
    const drinks = screen.getByRole('button', { name: /drinks/i });
    expect(All).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
  });

  //   it('filters by all', () => {
  //     const { getByText, getByTestId } = render(<App />);
  //     fireEvent.click(getByText('All'));
  //     expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
  //   });

  //   it('filters by meals', () => {
  //     const { getByText, getByTestId } = render(<App />);
  //     fireEvent.click(getByText('Meals'));
  //     expect(getByTestId('filter-by-meal-btn')).toBeInTheDocument();
  //   });

  //   it('filters by drinks', () => {
  //     const { getByText, getByTestId } = render(<App />);
  //     fireEvent.click(getByText('Drinks'));
  //     expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  //   });

  //   it.only('copies the URL', async () => {
  //     const { history } = renderWithRouter(<App />);
  //     act(() => {
  //       history.push('/favorite-recipes');
  //     });
  //     const share = screen.getByTestId('0-horizontal-share-btn');
  //     fireEvent.click(share);
  //     const All =  screen.getByText(/link copied!/i);
  //     // expect(getByTestId('copied')).toBeInTheDocument();
  //   });

//   it('removes a favorite', () => {
//     const { getByTestId } = render(<App />);
//     fireEvent.click(getByTestId('0-horizontal-favorite-btn'));
//     expect(getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
//   });
});
