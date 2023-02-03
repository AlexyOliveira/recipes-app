import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';

const dataTestidEmail = 'profile-email';
// const dataTestidRecetasFeitas = 'profile-done-btn';
// const dataTestidRecetasFavoritas = 'profile-favorite-btn';
const dataTestisLogout = 'profile-logout-btn';

describe('Testando a página de perfil', () => {
  test('Verifica se o botão de logout redireciona para a tela de login', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(dataTestidEmail);
    const button = screen.getByTestId(dataTestisLogout);
    userEvent.type(email, 'xablau@teste.com');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se a página de perfil renderiza corretamente', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /perfil/i });
    const email = screen.getByTestId(dataTestidEmail);
    const button = screen.getByTestId(dataTestisLogout);
    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Verifica se o email do usuário é exibido na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(dataTestidEmail);
    expect(email).toBeInTheDocument();
  });
});
