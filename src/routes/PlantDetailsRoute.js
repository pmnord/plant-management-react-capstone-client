import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'


export default class PlantDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            details: {},
            images: [],
        }
    }

    componentDidMount = () => {
        const trefle_id = this.props.router.match.params.plant_id

        fetch(`${config.API_ENDPOINT}/plant/${trefle_id}`, {
            headers: {
                'api-key': config.API_KEY,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => {
                const details = {
                    scientific_name: data.scientific_name,
                    common_name: data.common_name.charAt(0).toUpperCase() + data.common_name.slice(1),
                    plant_class: data.class
                        ? data.class.name
                        : null,
                    plant_order: data.order
                        ? data.order.name
                        : null,
                    family: data.family
                        ? data.family.name
                        : null,
                    family_common_name: data.family_common_name,
                    genus: data.genus.name,
                    duration: data.duration,
                    shade_tolerance: data.main_species.growth.shade_tolerance,
                    drought_tolerance: data.main_species.growth.drought_tolerance,
                    flower_color: data.main_species.flower.color,
                }

                this.setState({
                    details,
                    images: data.images,
                })
            })
            .catch(res => this.setState({ error: res.error }))
    }

    labelize(str) {
        return str
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    handleAddPlant = () => {
        const {
            scientific_name,
            common_name,
            plant_class,
            plant_order,
            family,
            family_common_name,
            genus,
            duration,
            shade_tolerance,
            drought_tolerance,
            flower_color,
        } = this.state.details

        const plantToAdd = {
            trefle_id: this.props.router.match.params.plant_id,
            image: this.state.images[0].url,
            scientific_name,
            common_name,
            plant_class,
            plant_order,
            family,
            family_common_name,
            genus,
            duration,
            shade_tolerance,
            drought_tolerance,
            flower_color,
        }

        return fetch(`${config.API_ENDPOINT}/garden`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY,
                'Authorization': `Bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(plantToAdd)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : this.props.router.history.push('/garden')
            )
            .catch(res => console.log(res.error))
    }

    render() {
        return (
            <div className='plant-details'>
                <button onClick={this.props.router.history.goBack}>Back</button>
                <div className="plant-details__innerdiv">
                    <div className="plant-details__images">
                        {this.state.images.map((image, idx) => <img key={idx} src={image.url} alt={`${this.state.details.scientific_name}`} />)}
                    </div>
                    <div className="plant-details__details">
                        {Object.entries(this.state.details).map((detail, idx) =>
                            <p key={idx}><strong>{this.labelize(detail[0])}: </strong>{detail[1]}</p>
                        )}
                        <a rel="noopener noreferrer" target="_blank" href={`https://en.wikipedia.org/wiki/${this.state.details.genus}`}><p>Wikipedia</p></a>
                        <button onClick={this.handleAddPlant}>Add to My Garden</button>
                    </div>
                </div>
            </div>
        )
    }
}