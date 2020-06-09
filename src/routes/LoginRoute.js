import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

// Simple page consisting of the Login component
// Mainly used to redirect users to when they do not have a valid token
export default function LoginRoute(props) {
        return (
            <div className="LoginRoute">
                <LoginForm updateLoggedIn={props.updateLoggedIn} router={props.router} />
            </div>
        )
}