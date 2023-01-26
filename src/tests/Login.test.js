import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';

const dataTestidEmail = 'email-input';
const dataTestidPassword = 'password-input';
const dataTestidLoginBtn = 'login-submit-btn';
describe('Testando a página de login', () => {
  test('Verifica se o botao é desabilitado ao digitar email/senha', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(dataTestidEmail);
    const password = screen.getByTestId(dataTestidPassword);
    const button = screen.getByTestId(dataTestidLoginBtn);
    userEvent.type(email, 'xablau@teste.com');
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
    userEvent.clear(email);
    userEvent.clear(password);
  });

  test('Verifica se a página de login renderiza corretamente', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /login/i });
    const email = screen.getByTestId(dataTestidEmail);
    const button = screen.getByTestId(dataTestidLoginBtn);
    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Verifica a rota correta ao clicar no botão de entrar', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId(dataTestidEmail);
    const password = screen.getByTestId(dataTestidPassword);
    const button = screen.getByTestId(dataTestidLoginBtn);
    userEvent.type(email, 'xablau@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });
});
