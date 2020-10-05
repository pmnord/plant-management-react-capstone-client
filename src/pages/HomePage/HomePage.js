import React from 'react';

import './HomePage.css';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../components/LoginForm/LoginForm';

// Homepage consisting of the pitch, the Registration component and Login component
export default function HomeRoute(props) {
  return (
    <div className='HomeRoute'>
      <div className='HomeRoute__pitch'>
        <h2>A world of plants at your fingertips</h2>
        <p>
          Build a collection of plants, explore a plant database, get in-depth
          information, and share your personal garden with other horticulture
          enthusiasts.
          <br />
          <br />
          Take a break for a while and just focus on the things you love,
          plants!
        </p>
      </div>
      <div className='HomeRoute__authentication'>
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
