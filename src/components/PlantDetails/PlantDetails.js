import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'


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
        console.log(this.props.router, this.props.router.match.params.plant_id)
        const trefle_id = this.props.router.match.params.plant_id

        fetch(`${config.API_ENDPOINT}/plant/${trefle_id}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => {
                const details = {
                    scientific_name: data.scientific_name,
                    common_name: data.common_name,
                    class: data.class.name,
                    order: data.order.name,
                    family: data.family.name,
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
        let newStr = str.replace('_', ' ')
        newStr = newStr.charAt(0).toUpperCase() + newStr.slice(1)
        return newStr
    }

    handleAddPlant = () => {
        return fetch(`${config.API_ENDPOINT}/garden`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify({
                trefle_id: this.props.router.match.params.plant_id,
                scientific_name: this.state.details.scientific_name,
                common_name: this.state.details.common_name,
                image: this.state.images[0].url
            })
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
                <button onClick={this.props.router.history.goBack}>Back to Search</button>
                <div className="plant-details__innerdiv">
                    <div className="plant-details__images">
                        {this.state.images.map(image => <img src={image.url} />)}
                    </div>
                    <div className="plant-details__details">
                        {Object.entries(this.state.details).map(detail =>
                            <p><strong>{this.labelize(detail[0])}: </strong>{detail[1]}</p>
                        )}
                        <a target="_blank" href={`https://en.wikipedia.org/wiki/${this.state.details.genus}`}><p>Wikipedia</p></a>
                        <button onClick={this.handleAddPlant}>Add to My Garden</button>
                    </div>
                </div>
            </div>
        )
    }
}