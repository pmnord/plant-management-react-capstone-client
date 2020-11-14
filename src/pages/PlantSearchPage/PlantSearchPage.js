import React from 'react';
import ApiService from '../../services/apiService';

import './PlantSearchPage.css';

import PlantSearchListItem from '../../components/PlantSearchListItem/PlantSearchListItem';
import TabBar from '../../components/TabBar/TabBar';

// Provides a search form to look up plants in the Trefle API database.
// Searches based on both scientific_name and common_name
export default class PlantSearchRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      searchResults: [],
    };
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null, loading: true, searchResults: [] });

    const query = e.target.plant_search.value;

    ApiService.getTreflePlants(query)
      .then((results) => {
        this.setState({ searchResults: results, loading: false });
      })
      .catch((res) => {
        this.setState({ error: res.error, loading: false });
      });
  };

  render() {
    return (
      <section className='plant-search'>
        <TabBar></TabBar>
        <h2 className='hidden'>Plant Explorer</h2>
        <div>
          <h3 className='plant-search__disclaimer'>
            Search every plant in the world (almost)!
          </h3>
        </div>

        <form className='plant-search__form' onSubmit={this.handleSearchSubmit}>
          <div>
            <label htmlFor='plant_search_input' className='plant-search__label'>
              Plant Name
            </label>
            <input
              className='plant-search__input'
              name='plant_search'
              id='plant_search_input'
              type='text'
            />
          </div>
          <button className='btn'>Search</button>
        </form>
        {this.state.loading && <h3>Loading results...</h3>}
        <p className='error'>{this.state.error ? this.state.error : null}</p>

        {/* Search results populated as components in an unordered list */}
        <ul className='plant-search__search-results'>
          {this.state.searchResults.map((plant) => {
            return (
              <PlantSearchListItem
                key={plant.id}
                trefle_id={plant.id}
                scientific_name={plant.scientific_name}
                common_name={plant.common_name}
                family={plant.family}
                family_common_name={plant.family_common_name}
                genus={plant.genus}
                image_url={plant.image_url}
                push={(path) => this.props.history.push(path)}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}
