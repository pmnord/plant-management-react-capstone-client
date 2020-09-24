import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

// Handles new user registration
export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitting: false,
            error: null,
        };
    }

    updateFormValue(input, value) {
        this.setState({ [input]: value });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({ error: null, submitting: true });

        const { username, password } = e.target
        const newUser = {
            username: username.value,
            password: password.value,
        }

        fetch(`${config.API_ENDPOINT}/user`, {
            method: 'POST',
            headers: {
                'api-key': config.API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(resJson => {

            username.value = ''
            password.value = ''

            return this.onRegistrationSuccess(newUser)
        })
        .catch(err => {
            console.log(err)
            this.setState({ error: err.error || 'Unable to register at this time', submitting: false })
        });
    }

    onRegistrationSuccess(newUser) {
        const credentials = {
            username: newUser.username,
            password: newUser.password,
        }

        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'api-key': config.API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => {
                if (!res.ok) return res.json().then(err => Promise.reject(err))
                return res.json()
            })
            .then(res => {
                TokenService.setToken(res.authToken)
                this.props.updateLoggedIn()
                this.props.router.history.push(`/garden`)
            })
            .catch(err => {
                this.setState({ error: err.error || 'Unable to register at this time', submitting: false })
            })
    }

    render() {
        return (
            <form className="registration__form" onSubmit={this.handleFormSubmit}>
                <h2>Create an Account</h2>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        value={this.state.username}
                        onChange={(e) => this.updateFormValue(e.target.name, e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        minLength="6"
                        required
                        value={this.state.password}
                        onChange={(e) => this.updateFormValue(e.target.name, e.target.value)}
                    />
                </div>
                <button disabled={this.state.submitting}>{ this.state.submitting ? 'Loading...' : 'Register' }</button>
                <div className='error'>{this.state.error}</div>
                
            </form>
        )
    }
}