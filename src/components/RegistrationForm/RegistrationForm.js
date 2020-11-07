import React from 'react';
import config from '../../config';

import './RegistrationForm.css';

import TokenService from '../../services/tokenService';
import Tooltip from '../Tooltip/Tooltip';

// Handles new user registration
export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      submitting: false,
      error: null,
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null, submitting: true });

    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ error: 'Passwords do not match', submitting: false });
      return;
    }

    const { username, password } = e.target;
    const newUser = {
      username: username.value,
      password: password.value,
      email: '',
    };

    fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'api-key': config.API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      })
      .then((resJson) => {
        username.value = '';
        password.value = '';

        return this.onRegistrationSuccess(newUser);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: err.error || 'Unable to register at this time',
          submitting: false,
        });
      });
  };

  onRegistrationSuccess(newUser) {
    const credentials = {
      username: newUser.username,
      password: newUser.password,
    };

    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'api-key': config.API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then((res) => {
        TokenService.setToken(res.authToken);
        this.props.updateLoggedIn();
        this.props.router.history.push(`/garden`);
      })
      .catch((err) => {
        this.setState({
          error: err.error || 'Unable to register at this time',
          submitting: false,
        });
      });
  }

  updateFormValue(input, value) {
    this.setState({ [input]: value });
  }

  render() {
    return (
      <form className='registration__form' onSubmit={this.handleFormSubmit}>
        <h2>Create an Account</h2>
        <div>
          <label htmlFor='username'>Username</label>
          <input
          className="basic-input"
            type='text'
            name='username'
            required
            value={this.state.username}
            onChange={(e) =>
              this.updateFormValue(e.target.name, e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor='password'>
            Password
            <Tooltip content='Passwords are stored encrypted and never visible to FancyPlants'>
              <span role='img' aria-label='password tooltip'>
                💬
              </span>
            </Tooltip>
          </label>
          <input
          className="basic-input"
            type='password'
            name='password'
            minLength='6'
            required
            value={this.state.password}
            onChange={(e) =>
              this.updateFormValue(e.target.name, e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor='password-confirmation'>
            Confirm Password
          </label>
          <input
          className="basic-input"
            type='password'
            name='password-confirmation'
            minLength='6'
            required
            value={this.state.passwordConfirmation}
            onChange={(e) =>
              this.updateFormValue('passwordConfirmation', e.target.value)
            }
          />
        </div>
        <button className="btn" disabled={this.state.submitting}>
          {this.state.submitting ? 'Loading...' : 'Register'}
        </button>
        <div className='error'>{this.state.error}</div>
      </form>
    );
  }
}
