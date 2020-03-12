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

    return (
        <li className="plant-search__list-item">
            <h3><strong>{props.scientific_name}</strong></h3>
            {props.common_name
                ? <p>"{props.common_name || ''}"</p>
                : null
            }
            <div>
                {props.complete_data
                    ? <Link to={`/plant/${props.trefle_id}`}><button>Plant Details</button></Link>
                    : null
                }
                <button onClick={handleAddPlant}>Add Plant</button>
            </div>
        </li>
    )
}