import React from 'react'

export default class PlantDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "222225",
            common_name: "",
            scientific_name: "Monstera acreana",
            genus: "Monstera",
            duration: "Perennial",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Monstera_deliciosa1281872728.jpg",
            note: ''
        }
    }



    render() {
        return (
            <div className='plant-details'>
                <div>
                    <img src={this.state.image}></img>
                    <div>
                        <p>Scientific Name: {this.state.scientific_name}</p>
                        <p>Common Name: {this.state.common_name}</p>
                        <p>Genus: {this.state.genus}</p>
                        <p>Duration: {this.state.duration}</p>
                    </div>
                </div>
                <button onClick={() => {
                    this.props.addPlant({ ...this.state })
                    this.props.router.history.push('/garden/dunder')
                }}>Add to my Garden</button>
            </div>
        )
    }
}