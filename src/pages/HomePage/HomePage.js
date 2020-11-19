import React, { useState } from "react";
import apiService from '../../services/apiService.js';
import tokenService from '../../services/tokenService.js';

import "./HomePage.css";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";

// Homepage consisting of the pitch, the Registration component and Login component
export default function HomeRoute(props) {
  const [error, setError] = useState('');

  const logInAsDemo = () => {
    apiService.logInUser('demo', 'password')
      .then((res) => {
        tokenService.setToken(res.authToken); // The server provides a JWT auth token
        props.updateLoggedIn('demo');
        props.router.history.push(`/collection`);
      })
      .catch((err) => {
        err.error
          ? setError(err.error)
          : setError('Unable to log in at this time')
      });
  }

  return (
    <div className="HomeRoute">
      <div className="HomeRoute__pitch">
        <h2>
          Plant Researcher exposes data from the Trefle.io database, one of the
          world's largest botanical databases.
        </h2>
        <h3>
          Explore plant species, curate a personal collection, and annotate your
          collection. Plant Researcher empowers you to quickly gather a
          collection of data on the species that interest you.
        </h3>
        <button className="btn" onClick={logInAsDemo}>Click Here to access the demo account</button>
        <p className='error'>{error}</p>
      </div>
      <div className="HomeRoute__authentication">
        <RegistrationForm
          updateLoggedIn={props.updateLoggedIn}
          router={props.router}
        />
        <LoginForm
          updateLoggedIn={props.updateLoggedIn}
          router={props.router}
        />
      </div>
    </div>
  );
}
