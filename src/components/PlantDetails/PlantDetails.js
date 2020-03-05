import React from 'react'
import { Link } from 'react-router-dom'

export default class PlantDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            common_name: "",
            scientific_name: "",
            genus: "",
            duration: "",
            image: "",
            note: '',
        }
    }

    componentDidMount = () => {
        const dummyData = [
            {
                "scientific_name": "Monstera parkeriana",
                "id": 224080,
                "common_name": null,
                image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Monstera_deliciosa_flower.jpg",
                genus: "Monstera",
                duration: "Perennial",
                note: '',
            },
            {
                "scientific_name": "Monstera gigantea",
                "id": 221918,
                "common_name": null,
                image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Monstera_deliciosa2.jpg',
                genus: "Monstera",
                duration: "Perennial",
                note: '',
            },
            {
                id: "222225",
                common_name: "",
                scientific_name: "Monstera acreana",
                genus: "Monstera",
                duration: "Perennial",
                image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Monstera_deliciosa1281872728.jpg",
                note: ''
            },
        ];

        const routeParams = this.props.router.match.params.plant_id;

        dummyData.forEach(obj => {
            if (obj.id == routeParams) {
                this.setState({ ...obj })
            }
        })
    }



    render() {
        return (
            <div className='plant-details'>
                <Link to="/plant-search">Back to Search Results</Link>
                <div>
                    <img src={this.state.image}></img>
                    <div>
                        <p>Scientific Name: {this.state.scientific_name}</p>
                        <p>Common Name: {this.state.common_name}</p>
                        <p>Genus: {this.state.genus}</p>
                        <p>Duration: {this.state.duration}</p>
                    </div>
                    <button onClick={() => {
                        this.props.addPlant({ ...this.state })
                        this.props.router.history.push('/garden/dunder')
                    }}>Add to my Garden</button>
                </div>
            </div>
        )
    }
}