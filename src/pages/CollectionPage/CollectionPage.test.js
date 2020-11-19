import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CollectionPage from './CollectionPage';

it('Renders the CollectionPage component', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter>
            <CollectionPage />
        </BrowserRouter>
        , div);

    ReactDOM.unmountComponentAtNode(div);
});