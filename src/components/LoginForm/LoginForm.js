import React from "react";
import config from "../../config";
import TokenService from "../../services/tokenService";

// Handles log in functionality
export default class LoginForm extends React.Component {
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

    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": config.API_KEY,
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => Promise.reject(err));
        return res.json();
      })
      .then((res) => {
        TokenService.setToken(res.authToken); // The server provides a JWT auth token
        this.props.updateLoggedIn(); // Sets LoggedIn on the parent component state
        this.props.router.history.push(`/garden`);
      })
      .catch((err) => {
        this.setState({ error: err.error || 'Unable to log in at this time', submitting: false });
      });
  };

  render() {
    return (
      <form className="login" onSubmit={this.handleLoginSubmit}>
        <h2>Log In</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <button disabled={this.state.submitting}>
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
