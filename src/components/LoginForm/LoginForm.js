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

        const { username, password } = e.target
        const credentials = {
            username: username.value,
            password: password.value,
        }

        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => {
                if (!res.ok) return res.json().then(err => Promise.reject(err))
                return res.json()
            })
            .then(res => {
                console.log(res)
                TokenService.setToken(res.authToken)
                this.props.history.push(`/garden/${credentials.username}`) // change this so it's coming from db
            })
            .catch(err => {
                this.setState({ error: err.error })
            })
    }

    render() {
        return (
            <div>
                <form className="login" onSubmit={this.handleLoginSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button >Log In</button>
                    <div className='error'>{this.state.error}</div>
                </form>
            </div>
        )
    }
}