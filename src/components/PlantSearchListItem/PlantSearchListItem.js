import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../config'
import TokenService from '../../services/token-service'

export default function PlantSearchListItem(props) {

    function handleAddPlant() {
        return fetch(`${config.API_ENDPOINT}/garden`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY,
                'Authorization': `Bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify({
                trefle_id: props.trefle_id,
                scientific_name: props.scientific_name,
                common_name: props.common_name,
            })
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : props.push('/garden')
        )
        .catch(res => console.log(res.error))
    }

    function capitalize(str) {
        return str
            .split(' ')
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(' ')
    }

    return (
        <li className="plant-search__list-item">
            <div className="plant-search__plant-names">
                <h3><strong>{props.scientific_name}</strong></h3>
                {props.common_name
                    ? <p>"{capitalize(props.common_name)}"</p>
                    : <p></p>
                }
            </div>
            <div className="plant-search__list-item__buttons">
                {props.complete_data
                    ? <Link to={`/plant/${props.trefle_id}`}><button>Details</button></Link>
                    : null
                }
                <button onClick={handleAddPlant}>Add Plant</button>
            </div>
        </li>
    )
}