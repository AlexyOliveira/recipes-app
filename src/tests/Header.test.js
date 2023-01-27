import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';

const dataTestidEmail = 'email-input';
const dataTestidPassword = 'password-input';
const dataTestidLoginBtn = 'login-submit-btn';
describe('Testando o componente Header', () => {
  test('Verifica se o header é renderizado corretamente na rota "/meals"', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(dataTestidEmail);
    const password = screen.getByTestId(dataTestidPassword);
    const button = screen.getByTestId(dataTestidLoginBtn);
    userEvent.type(email, 'xablau@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    const title = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(title).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    userEvent.clear(email);
    userEvent.clear(password);
  });
  test('Verifica se ao clicar no icon profile, é redirecionado p/ pagina profile', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const iconProfile = screen.getByRole('button', { name: /profile-icon/i });
    const iconSearch = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(iconSearch);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'xablau');
    userEvent.click(iconSearch);
    expect(input).not.toBeInTheDocument();
    userEvent.click(iconProfile);
    expect(history.location.pathname).toBe('/profile');
  });
});
