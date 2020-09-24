import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from './Tooltip';

it('Renders the Tooltip component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Tooltip />, div);
    ReactDOM.unmountComponentAtNode(div);
});