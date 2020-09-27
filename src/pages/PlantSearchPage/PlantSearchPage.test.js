import React from 'react';
import ReactDOM from 'react-dom';

import PlantSearch from './PlantSearchPage';

it('Renders the PlantSearch component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<PlantSearch />, div);

    ReactDOM.unmountComponentAtNode(div);
});