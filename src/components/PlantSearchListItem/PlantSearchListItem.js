import React from 'react'
import { Link } from 'react-router-dom'

export default function PlantSearchListItem(props) {

    return (
        <li className="plant-search__list-item">
            <h3><strong>{props.scientific_name}</strong></h3>
            {props.common_name
                ? <p>"{props.common_name || ''}"</p>
                : null
            }
            <button>Add Plant</button>
            {props.complete_data
                ? <Link to={`/plant/${props.trefle_id}`}><button>Plant Details</button></Link>
                : null
            }
        </li>
    )
}