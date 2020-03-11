import React from 'react'
import PlantSearchListItem from '../PlantSearchListItem/PlantSearchListItem'
import config from '../../config'

export default class PlantSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            searchResults: [],
        }
    }

    handleSearchSubmit = e => {
        e.preventDefault();
        this.setState({ error: null })

        const query =  e.target.plant_search.value;

        fetch(`${config.API_ENDPOINT}/plant?q=${query}`)
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
        .then(results => 
            this.setState({ searchResults: results})
        )
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    render() {
        return (
            <section className="plant-search">
                <form onSubmit={this.handleSearchSubmit}>
                    <label htmlFor="plant_search" hidden>Plant Name</label>
                    <input 
                        className="plant-search__search-input"
                        name="plant_search"
                        type="text"
                        placeholder="Search by plant names"
                    />
                    <button>Search</button>
                </form>
                <p className="error">
                    {this.state.error
                        ? this.state.error
                        : null
                    }
                </p>

                <ul className="plant-search__search-results">
                    {this.state.searchResults.map((result, idx) => {
                        return (
                            <PlantSearchListItem
                                key={idx}
                                trefle_id={result.id}
                                scientific_name={result.scientific_name}
                                common_name={result.common_name}
                                complete_data={result.complete_data}
                            />
                        )
                    })}
                </ul>
            </section>
        )
    }
}