import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    handleLoginSubmit = e => {
        e.preventDefault()
        this.setState({ error: null })

        const username = e.target.username.value
        const password = e.target.password.value

        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY,
            },
            body: JSON.stringify({ username, password }),
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
                this.setState({ error: err.error })
            })
    }

    render() {
        return (
                <form className="login" onSubmit={this.handleLoginSubmit}>
                    <h2>Log In</h2>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button >Submit</button>
                    <div className='error'>{this.state.error}</div>
                </form>
        )
    }
}