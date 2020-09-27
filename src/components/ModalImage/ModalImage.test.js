import React from 'react';
import ReactDOM from 'react-dom';

import ModalImage from './ModalImage';

it('Renders the ModalImage component', () => {
    const div = document.createElement('div')

    ReactDOM.render(<ModalImage />, div)

    ReactDOM.unmountComponentAtNode(div)
});