import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default function Header(props) {

    function renderLoginButton() {
        return (
            <Link to='/login'>
                <button>Log In</button>
            </Link>
        )
    }

    function renderLogoutButton() {
        return (
            <div>
                <Link to="/garden">
                    <button>My Garden</button>
                </Link>
                <button onClick={TokenService.clearToken}>Log Out</button>
            </div>
        )
    }


    return (
        <header className="header">
            <Link to='/'>
                <h1>Fancy Plants</h1>
            </Link>
            {
                TokenService.hasToken()
                    ? renderLogoutButton()
                    : renderLoginButton()
            }

        </header>
    )
}