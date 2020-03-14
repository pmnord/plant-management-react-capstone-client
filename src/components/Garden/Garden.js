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

    updateDbNote = (e, instance_id) => {
        const updateValues = {
            note: e.target.value
        }

        ApiService.updatePlantInstance(instance_id, updateValues)
    }

    updateWatered = (idx) => {
        const newState = { plants: [...this.state.plants] }
        newState.plants[idx].watered_date = moment().format('MMMM Do h:mm a')
        const newWateredDate = newState.plants[idx].watered_date
        const plantInstanceId = newState.plants[idx].instance_id
        const updateValues = {
            watered_date: newWateredDate
        }

        this.setState(newState)
        ApiService.updatePlantInstance(plantInstanceId, updateValues)
    }

    addPlant = (newPlant) => {
        const newPlants = [...this.state.plants]
        newPlants.push(newPlant)
        const newState = { plants: newPlants }
        this.setState(newState)
    }

    deletePlant = (instanceId) => {
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
                            updateDbNote={this.updateDbNote}
                            updateWatered={this.updateWatered}
                            deletePlant={instanceId => this.deletePlant(instanceId)}
                            idx={idx}
                            push={(path) => this.props.router.history.push(path)} />)}
                </section>
            </div>
        )
    }
}