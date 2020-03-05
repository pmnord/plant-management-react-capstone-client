import React from 'react'
import PlantCard from '../PlantCard/PlantCard'
import { Link } from 'react-router-dom'

export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: [
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                    note: ''
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                    note: ''
                },
                {
                    common_name: "tarovine",
                    scientific_name: "Monstera deliciosa",
                    genus: "Monstera",
                    duration: "Perennial",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
                    note: ''
                },
            ]
        }
    }

    render() {
        return (
            <div className='garden'>
                <section className="garden-hud">
                    <Link to="/plant-search">
                        <button>Get More Plants</button>
                    </Link>
                </section>
                <section className="plant-grid">
                    {this.props.plants.map((plant, idx) => <PlantCard key={idx} plant={plant} updateNote={this.props.updateNote} updateWatered={this.props.updateWatered} idx={idx} />)}
                </section>
            </div>
        )
    }
}