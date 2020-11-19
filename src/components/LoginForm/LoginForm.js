import React from "react";
import apiService from "../../services/apiService.js";
import tokenService from "../../services/tokenService.js";

import "./LoginForm.css";

// Handles log in functionality
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      error: null,
    };
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null, submitting: true });
    const username = e.target.username.value;
    const password = e.target.password.value;
    e.target.username.value = "";
    e.target.password.value = "";

    apiService.logInUser(username, password)
      .then((res) => {
        tokenService.setToken(res.authToken); // The server provides a JWT auth token
        this.props.updateLoggedIn(username);
        this.props.router.history.push(`/collection`);
      })
      .catch((err) => {
        this.setState({
          error: err.error || "Unable to log in at this time",
          submitting: false,
        });
      });
  };

  render() {
    return (
      <form className="login" onSubmit={this.handleLoginSubmit}>
        <h2>Log In</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input className="basic-input" type="text" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="basic-input"
            type="password"
            name="password"
            required
          />
        </div>
        <button className="btn" disabled={this.state.submitting}>
          {this.state.submitting ? "Loading..." : "Submit"}
        </button>
        <div className="error">{this.state.error}</div>
        <p
          style={{
            fontSize: "0.8rem",
            color: " hsla(0, 0%, 40%)",
            textAlign: "center",
          }}
        >
          * To demo the app, use the credentials: demo/password
        </p>
      </form>
    );
  }
}

export default LoginForm;
