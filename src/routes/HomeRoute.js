import React from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import LoginForm from '../components/LoginForm/LoginForm';

// Homepage consisting of the pitch, the Registration component and Login component
export default function HomeRoute(props) {
    return (
        <div className="HomeRoute">
            <div className="HomeRoute__pitch">
                <p><strong><u>To demo the app use the following credentials</u></strong></p>
                <p><strong>Username: demo | Password: password</strong></p>
                <p>Fancy Plants allows you to create a virtual garden for all of your plants, get in-depth information on plant care, and share your personal garden with other house plant enthusiasts.
                        <br />
                        <br />
                        Take a break from social media, work, and the news for a while and just focus on the things you love - plants!</p>
            </div>
            <div className="HomeRoute__authentication">
                <RegistrationForm updateLoggedIn={props.updateLoggedIn} router={props.router} />
                <LoginForm updateLoggedIn={props.updateLoggedIn} router={props.router} />
            </div>
        </div>
    )
}