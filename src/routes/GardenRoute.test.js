import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import GardenRoute from './GardenRoute'

it('Renders the GardenRoute component', () => {
    const div = document.createElement('div')

    ReactDOM.render(
        <BrowserRouter>
            <GardenRoute />
        </BrowserRouter>
        , div)

    ReactDOM.unmountComponentAtNode(div)
})