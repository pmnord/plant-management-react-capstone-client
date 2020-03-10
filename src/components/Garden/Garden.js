import React from 'react'
import PlantCard from '../PlantCard/PlantCard'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api-service'

export default class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    componentDidMount() {
        ApiService.getUserPlants()
            .then(plants => this.setState({ plants }))
            .catch(err => this.setState({ error: err }))
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
                    {plants.map((plant, idx) => <PlantCard key={idx} plant={plant} updateNote={this.props.updateNote} updateWatered={this.props.updateWatered} idx={idx} />)}
                </section>
            </div>
        )
    }
}