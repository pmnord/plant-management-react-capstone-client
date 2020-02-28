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
            <Link to='/'>
                <button>Log Out</button>
            </Link>
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