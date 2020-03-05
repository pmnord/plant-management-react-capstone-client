import React from 'react'
import { Link } from 'react-router-dom'

export default class PlantSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {
                    "slug": "monstera-acreana",
                    "scientific_name": "Monstera acreana",
                    "link": "http://trefle.io/api/plants/222225",
                    "id": 222225,
                    "complete_data": false,
                    "common_name": null
                },
                {
                    "slug": "monstera-parkeriana",
                    "scientific_name": "Monstera parkeriana",
                    "link": "http://trefle.io/api/plants/224080",
                    "id": 224080,
                    "complete_data": false,
                    "common_name": null
                },
                {
                    "slug": "monstera-gigantea",
                    "scientific_name": "Monstera gigantea",
                    "link": "http://trefle.io/api/plants/221918",
                    "id": 221918,
                    "complete_data": false,
                    "common_name": null
                },
            ]
        }
    }

    render() {
        return (
            <section className="plant-search">
                <form>
                    <label>Plant Name: </label>
                    <input className="plant-search__search-input" type="text" value="These are placeholder search results until the app is hooked up to the database" />
                </form>

                <ul className="plant-search__search-results">
                    {this.state.searchResults.map((result, idx) => {
                        return (
                            <Link to={`/plant/${result.id}`} key={idx}>
                                <li className="plant-search__list-item">
                                    <h3><strong>{result.scientific_name}</strong></h3>
                                    <p>Common Name: {result.common_name || ''}</p>
                                    <p>Complete Data: {String(result.complete_data)}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </section>
        )
    }
}