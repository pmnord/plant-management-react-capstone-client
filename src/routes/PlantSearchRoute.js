import React from 'react';
import PlantSearchListItem from '../components/PlantSearchListItem/PlantSearchListItem';
import config from '../config';

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

    handleSearchSubmit = e => {
        e.preventDefault();
        this.setState({ error: null });

        const query = e.target.plant_search.value;

        fetch(`${config.API_ENDPOINT}/plant?q=${query}`, {
            headers: {
                'api-key': config.API_KEY,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(results => {
                const sortedResults = results.sort((a, b) => a.complete_data === b.complete_data ? 0 : a.complete_data ? -1 : 1);
                this.setState({ searchResults: sortedResults });
            }
            )
            .catch(res => {
                this.setState({ error: res.error });
            });
    }

    render() {
        return (
            <section className="plant-search">
                <div>
                    <p className="plant-search__disclaimer">Data is provided from the Trefle.io database and is still being populated with images and details for all plants.</p>
                </div>

                <form onSubmit={this.handleSearchSubmit}>
                    <label htmlFor="plant_search_input" className="hidden">Plant Name</label>
                    <input
                        className="plant-search__search-input"
                        name="plant_search"
                        id="plant_search_input"
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

                {/* Search results populated as components in an unordered list */}
                <ul className="plant-search__search-results">
                    {this.state.searchResults.map((result, idx) => {
                        return (
                            <PlantSearchListItem
                                key={idx}
                                trefle_id={result.id}
                                scientific_name={result.scientific_name}
                                common_name={result.common_name}
                                complete_data={result.complete_data}
                                push={path => this.props.history.push(path)}
                            />
                        )
                    })}
                </ul>
            </section>
        )
    }
}