import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import LoginRoute from './LoginRoute'

it('Renders the LoginRoute component', () => {
    const div = document.createElement('div')

    ReactDOM.render(
        <BrowserRouter>
            <LoginRoute />
        </BrowserRouter>
        , div)

    ReactDOM.unmountComponentAtNode(div)
})