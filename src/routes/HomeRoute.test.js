import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import HomeRoute from './HomeRoute';

it('Renders the HomeRoute component', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter>
            <HomeRoute />
        </BrowserRouter>
        , div);

    ReactDOM.unmountComponentAtNode(div);
});