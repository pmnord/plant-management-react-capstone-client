import React from 'react'
import PlantCard from '../PlantCard/PlantCard'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api-service'
import moment from 'moment'

export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            plants: []
        }
    }

    componentDidMount() {
        ApiService.getUserPlants()
            .then(plants => this.setState({ plants }))
            .catch(err => this.setState({ error: err }))
    }

    updateNote = (e, idx) => {
        const newValue = e.target.value
        const newState = { plants: [...this.state.plants] }
        newState.plants[idx].note = newValue

        this.setState(newState)
    }

    updateWatered = (idx) => {
        const newState = { plants: [...this.state.plants] }
        newState.plants[idx].watered_date = moment().format('MMMM Do h:mm a')

        this.setState(newState)
    }

    addPlant = (newPlant) => {
        const newPlants = [...this.state.plants]
        newPlants.push(newPlant)
        const newState = { plants: newPlants }
        this.setState(newState)
    }

    deletePlant = (instanceId) => {
        console.log('you hit the parent function')
        const plants = this.state.plants.filter(plant => plant.instance_id != instanceId)
        this.setState({ plants })
    }

    render() {
        const { plants = [] } = this.state;

        return (

            <div className='garden'>
                <section className="garden-hud">
                    <Link to="/plant-search">
                        <button>Get More Plants</button>
                    </Link>
                </section>
                
                <section className="plant-grid">
                    {plants.map((plant, idx) =>
                        <PlantCard
                            key={idx}
                            plant={plant}
                            updateNote={this.updateNote}
                            updateWatered={this.updateWatered}
                            deletePlant={instanceId => this.deletePlant(instanceId)}
                            idx={idx} />)}
                </section>
            </div>
        )
    }
}