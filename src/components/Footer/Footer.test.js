import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'

import Footer from './Footer'

it('Renders the Footer component', () => {
    const div = document.createElement('div')

    ReactDOM.render(<Footer />, div)

    ReactDOM.unmountComponentAtNode(div)
})