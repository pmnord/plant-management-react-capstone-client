import React from 'react';
import ReactDOM from 'react-dom';

import Toolbar from './Toolbar';

it('Renders the Toolbar component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Toolbar />, div);
    ReactDOM.unmountComponentAtNode(div);
});