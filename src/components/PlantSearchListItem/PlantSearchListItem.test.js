import React from 'react';
import ReactDOM from 'react-dom';

import PlantSearchListItem from './PlantSearchListItem';

it('Renders the PlantSearchListItem component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<PlantSearchListItem />, div);

    ReactDOM.unmountComponentAtNode(div);
});