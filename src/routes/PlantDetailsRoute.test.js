import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Router } from 'react-router-dom'

import PlantDetailsRoute from './PlantDetailsRoute'

it('Renders the PlantDetailsRoute component', () => {
    const div = document.createElement('div')

    ReactDOM.render(
        <BrowserRouter>
            <PlantDetailsRoute 
                router={{
                    history:{},
                    match:{
                        params: {}
                    }
                    }} />
        </BrowserRouter>
        , div)

    ReactDOM.unmountComponentAtNode(div)
})