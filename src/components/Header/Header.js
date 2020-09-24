import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";

export default class Header extends React.Component {
  handleLogoutclick = () => {
    TokenService.clearToken();
    this.props.handleLogout();
  };

  renderLoginButton() {
    return (
      <div>
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
    );
  }

  renderLogoutButton() {
    return (
      <div>
        <Link to="/">
          <button onClick={this.handleLogoutclick}>Log Out</button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <header className="header">
        <nav className="header__nav">
          <h1>
            {/* Redirects based on Public or Protected route */}
            <Link to="/">Fancy Plants</Link>
          </h1>
          {/* Conditionally render Login or Logout */}
          {TokenService.hasToken()
            ? this.renderLogoutButton()
            : this.renderLoginButton()}
        </nav>
      </header>
    );
  }
}
