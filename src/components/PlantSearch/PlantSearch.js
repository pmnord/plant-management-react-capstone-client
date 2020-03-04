import React from 'react'
import { Link } from 'react-router-dom'

export default class PlantSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [

                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                },

            ]
        }
    }

    render() {
        return (
            <section className="plant-search">
                <form>
                    <label>Common Name</label>
                    <input type="text" />
                </form>

                <ul className="plant-search__search-results">
                    {this.state.searchResults.map((result, idx) => {
                        return (
                            <Link to="/plant/testplant" key={idx}>
                                <li>{result.common_name} <em>{result.scientific_name}</em></li>
                            </Link>
                        )
                    })}
                </ul>
            </section>
        )
    }
}