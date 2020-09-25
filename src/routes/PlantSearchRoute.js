import React from 'react';
import PlantSearchListItem from '../components/PlantSearchListItem/PlantSearchListItem';
import Toolbar from '../components/Toolbar/Toolbar';
import ApiService from '../services/apiService';

// Provides a search form to look up plants in the Trefle API database.
// Searches based on both scientific_name and common_name
export default class PlantSearchRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      searchResults: [],
    };
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });

    const query = e.target.plant_search.value;

    ApiService.getTreflePlants(query)
      .then((results) => {
        console.log(results);
        this.setState({ searchResults: results.data });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <section className='plant-search'>
        <Toolbar></Toolbar>
        <h2 className='hidden'>Plant Explorer</h2>
        <div>
          <h3 className='plant-search__disclaimer'>
            Search every plant in the world (almost) with the Trefle API
          </h3>
        </div>

        <form onSubmit={this.handleSearchSubmit}>
          <label htmlFor='plant_search_input' className='hidden'>
            Plant Name
          </label>
          <input
            className='plant-search__input'
            name='plant_search'
            id='plant_search_input'
            type='text'
            placeholder='Search by Scientific Name or Common Name'
          />
          <button>Search</button>
        </form>

        <p className='error'>{this.state.error ? this.state.error : null}</p>

        {/* Search results populated as components in an unordered list */}
        <ul className='plant-search__search-results'>
          {this.state.searchResults.map((result) => {
            return (
              <PlantSearchListItem
                key={result.id}
                trefle_id={result.id}
                scientific_name={result.scientific_name}
                common_name={result.common_name}
                complete_data={result.complete_data}
                image_url={result.image_url}
                push={(path) => this.props.history.push(path)}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}
