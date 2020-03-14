import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    handleLogoutclick = () => {
        TokenService.clearToken()
        this.props.handleLogout()
    }

    renderLoginButton() {
        return (
            <div>
                <Link
                    to='/login'>
                    <button
                    >Log In
                    </button>
                </Link>
            </div>
        )
    }

    renderLogoutButton() {
        return (
            <div>
                <Link to="/garden">
                    <button>My Garden</button>
                </Link>
                <Link to="/">
                    <button onClick={this.handleLogoutclick}>Log Out</button>
                </Link>
            </div>
        )
    }


    render() {
        return (
            <header className="header">
                <nav className="header__nav">
                    <h1>
                        <Link to='/'>
                            Fancy Plants
                        </Link>
                    </h1>
                    {TokenService.hasToken()
                        ? this.renderLogoutButton()
                        : this.renderLoginButton()}
                </nav>
            </header>
        )
    }
}