import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './login.css';
import Tomato from '../images/tomate.png';
import logo from '../images/logo.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isRequired: false,
  };

  handleChange = (ev) => {
    const { target } = ev;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const n = 6;
      const isVal = email.includes('@') && email.includes('.com') && password?.length > n;
      this.setState({ isRequired: isVal });
    });
  };

  handleSubmit = async () => {
    const { email } = this.state;
    // await fechtTokenApi();
    const { history } = this.props;
    // const { nick, email } = this.state;
    // dispatch(addName(nick));
    // dispatch(addEmail(email));
    // this.gravatar();
    // this.setState({
    //   isRequired: false,
    // });
    history.push('/meals');

    localStorage.setItem('user', JSON.stringify({ email }));
  };

  render() {
    const { password, email, isRequired } = this.state;
    return (
      <div className="loginContainer">
        <div className="logoArea">
          <img className="logo" src={ logo } alt="logo" />
          <img className="tomato" src={ Tomato } alt="tomato" />
        </div>

        <div className="formArea">
          <h1 className="login">login</h1>
          <form>
            <div className="imputs">
              <input
                className="inputForm"
                placeholder="Email"
                onChange={ this.handleChange }
                data-testid="email-input"
                type="email"
                name="email"
                value={ email }
              />
              <input
                className="inputForm"
                placeholder="Password"
                onChange={ this.handleChange }
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
              />
              <button
                className="btn btn-warning btnLogin"
                disabled={ !isRequired }
                onClick={ this.handleSubmit }
                data-testid="login-submit-btn"
                type="button"
              >
                {' '}
                Submit
              </button>
            </div>

          </form>

        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
