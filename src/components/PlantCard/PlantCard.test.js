import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import PlantCard from './PlantCard'

it('Renders the PlantCard component', () => {
    const div = document.createElement('div')

    ReactDOM.render(<BrowserRouter>
        <PlantCard
            plant={{
                scientific_name: '',
                common_name: '',
                image: '',
                instance_id: '',
                trefle_id: '',
            }}
        />
    </BrowserRouter>, div)

    ReactDOM.unmountComponentAtNode(div)
})