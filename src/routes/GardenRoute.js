import React from 'react';
import PlantCard from '../components/PlantCard/PlantCard';
import { Link } from 'react-router-dom';
import ApiService from '../services/api-service';
import moment from 'moment';

// The Garden page renders a grid of a user's plants and provides ways to interact with those plants
// It represents the current state of a user's plant collection in the database
export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            plants: [],
            plantsCache: []
        };
        this._isMounted = false;
    }

    // Retrieve a user's plants and set them in the component state
    componentDidMount = () => {
        this._isMounted = true;
        this._isMounted && ApiService
            .getUserPlants()
            .then(plants => this._isMounted && this.setState({ plants: plants, plantsCache: plants }))
            .catch(err => this._isMounted && this.setState({ error: err }));
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    updateNote = (e, idx) => {
        const newValue = e.target.value;
        const newState = { plants: [...this.state.plants] };
        newState.plants[idx].note = newValue;

        this.setState(newState);
    }

    updateDbNote = (e, instance_id) => {
        const updateValues = {
            note: e.target.value
        }

        ApiService.updatePlantInstance(instance_id, updateValues)
    }

    updateWatered = (idx) => {
        const newState = { plants: [...this.state.plants] };
        newState.plants[idx].watered_date = moment().format('MMMM Do h:mm a');
        const newWateredDate = newState.plants[idx].watered_date;
        const plantInstanceId = newState.plants[idx].instance_id;
        const updateValues = {
            watered_date: newWateredDate
        };

        this.setState(newState);

        /* It might be better to update the component state only once the API call goes through,
        but it would also create lag time between when the user clicks the button and when the value
        updates */
        ApiService.updatePlantInstance(plantInstanceId, updateValues);
    }

    addPlant = (newPlant) => {
        const newPlants = [...this.state.plants];
        newPlants.push(newPlant);
        const newState = { plants: newPlants };
        this.setState(newState);
    }

    deletePlant = (instanceId) => {
        const plants = this.state.plants.filter(plant => plant.instance_id !== instanceId);
        this.setState({ plants });
    }

    // Filters plants in the grid display without altering them
    filterPlants = (e) => {
        const query = e.target.value.toLowerCase();

        const filteredPlants = this.state.plantsCache.filter(plant =>
            plant.scientific_name.toLowerCase().includes(query)
                ? true
                : plant.common_name
                    ? plant.common_name.toLowerCase().includes(query)
                    : false
        )
        this.setState({ plants: filteredPlants });
    }

    render() {
        const { plants = [] } = this.state;

        return (
            <div className='garden'>
                <section className="garden-hud">
                    <Link to="/plant">
                        <button>Get More Plants</button>
                    </Link>
                    <label htmlFor="garden-filter"><strong>Filter Plants:</strong></label>
                    <input id="garden-filter" name="garden-filter" className="garden-hud__filter" type="text" onChange={this.filterPlants} />
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