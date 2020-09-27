import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/tokenService';

import './Header.css';

const Header = (props) => {
  const handleLogoutclick = () => {
    TokenService.clearToken();
    props.handleLogout();
  };

  const renderLoginButton = () => {
    return (
      <div>
        <Link to='/login'>
          <button className="btn">Log In</button>
        </Link>
      </div>
    );
  };

  const renderLogoutButton = () => {
    return (
      <div>
        <Link to='/'>
          <button className="btn" onClick={handleLogoutclick}>Log Out</button>
        </Link>
      </div>
    );
  };

  return (
    <header className='header'>
      <nav className='header__nav'>
        <h1>
          {/* Redirects based on Public or Protected route */}
          <Link to='/'>Fancy Plants</Link>
        </h1>
        {/* Conditionally render Login or Logout */}
        <div className='header__right'>
          {props.username && <span>Welcome, {props.username}!</span>}
          {TokenService.hasToken() ? renderLogoutButton() : renderLoginButton()}
        </div>
      </nav>
    </header>
  );
};

export default Header;
