import React from 'react';
import moment from 'moment';

import './GardenPage.css';

import ApiService from '../../services/apiService.js';
import PlantCard from '../../components/PlantCard/PlantCard.js';
import TabBar from '../../components/TabBar/TabBar.js';

// The Garden page renders a grid of a user's plants and provides ways to interact with those plants
export default class Garden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      plants: [],
      plantsCache: [],
    };
  }

  // Retrieve a user's plants and set them in the component state
  componentDidMount() {
    ApiService.getUserPlants()
      .then((plants) => {
        this.setState({ plants: plants, plantsCache: plants, loaded: true });
      })
      .catch((err) => this.setState({ error: err }));
  }

  updateNote(e, idx) {
    const newValue = e.target.value;
    const newState = { plants: [...this.state.plants] };
    newState.plants[idx].note = newValue;

    this.setState(newState);
  }

  updateDbNote(e, instance_id) {
    const updateValues = {
      note: e.target.value,
    };

    ApiService.updatePlantInstance(instance_id, updateValues);
  }

  updateWatered(idx) {
    const newState = { plants: [...this.state.plants] };
    newState.plants[idx].watered_date = moment().format('MMMM Do h:mm a');
    const newWateredDate = newState.plants[idx].watered_date;
    const plantInstanceId = newState.plants[idx].instance_id;
    const updateValues = {
      watered_date: newWateredDate,
    };

    this.setState(newState);

    /* It might be better to update the component state only once the API call goes through,
        but it would also create lag time between when the user clicks the button and when the value
        updates EDIT: this approach is called 'optimistic updating' */
    ApiService.updatePlantInstance(plantInstanceId, updateValues);
  }

  addPlant(newPlant) {
    const newPlants = [...this.state.plants];
    newPlants.push(newPlant);
    const newState = { plants: newPlants };
    this.setState(newState);
  }

  deletePlant(instanceId) {
    const plants = this.state.plants.filter(
      (plant) => plant.instance_id !== instanceId
    );
    this.setState({ plants });
  }

  // Filters plants in the grid display without altering them
  filterPlants(e) {
    const query = e.target.value.toLowerCase();

    const filteredPlants = this.state.plantsCache.filter((plant) =>
      plant.scientific_name.toLowerCase().includes(query)
        ? true
        : plant.common_name
        ? plant.common_name.toLowerCase().includes(query)
        : false
    );
    this.setState({ plants: filteredPlants });
  }

  render() {
    const { plants = [] } = this.state;

    return (
      <div className='garden'>
        <TabBar />
        <div className='garden-filter'>
          <label htmlFor='garden-filter__input'>
            <strong>Filter:</strong>
          </label>
          <input
            id='garden-filter__input'
            name='garden-filter__input'
            className='garden-filter__input'
            type='text'
            onChange={this.filterPlants}
          />
        </div>

        <section className='plant-grid'>
          {plants.map((plant, idx) => (
            <PlantCard
              key={idx}
              plant={plant}
              updateNote={this.updateNote}
              updateDbNote={this.updateDbNote}
              updateWatered={this.updateWatered}
              deletePlant={(instanceId) => this.deletePlant(instanceId)}
              idx={idx}
              push={(path) => this.props.router.history.push(path)}
            />
          ))}
        </section>
        {this.state.loaded && plants.length === 0 && (
          <div className='collection__collection-empty'>
            <h2>Your collection is empty</h2>
            <h3>Add new plants with the Plant Search module</h3>
          </div>
        )}
      </div>
    );
  }
}
