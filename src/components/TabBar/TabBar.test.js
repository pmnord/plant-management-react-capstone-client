import React from 'react';
import ReactDOM from 'react-dom';

import TabBar from './TabBar';

it('Renders the TabBar component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<TabBar />, div);
    ReactDOM.unmountComponentAtNode(div);
});