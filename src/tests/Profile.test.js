import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';

const dataTestidEmail = 'profile-email';
// const dataTestidRecetasFeitas = 'profile-done-btn';
// const dataTestidRecetasFavoritas = 'profile-favorite-btn';
const dataTestisLogout = 'profile-logout-btn';

describe('Testando a página de perfil', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Verifica se a função handleLogout funciona corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');

    await waitFor(() => {
      const email = screen.getByTestId(dataTestidEmail);
      expect(email).toBeInTheDocument();
    });
    const getEmail = screen.getByTestId(dataTestidEmail);
    expect(getEmail).toHaveTextContent('teste@teste.com');
  });

  test('Verifica se a função handleLogout funciona corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');

    await waitFor(() => {
      const email = screen.getByTestId(dataTestidEmail);
      expect(email).toBeInTheDocument();
    });

    const logout = screen.getByTestId(dataTestisLogout);
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
  });
});
