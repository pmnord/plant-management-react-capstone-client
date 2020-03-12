import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

export default function PlantCard(props) {

    function handleDelete(plant_id) {
        return fetch(`${config.API_ENDPOINT}/garden/${plant_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : props.deletePlant(plant_id)
        )
        .catch(err => console.log(err))
    }

    return (
        <div className='plant-card'>

            <div className='plant-card__header'>
                <div className="flex">
                    <h3>{props.plant.scientific_name}</h3>
                    <button onClick={() => handleDelete(props.plant.instance_id)}>Delete</button>
                </div>
                <img src={props.plant.image} />
                {props.plant.common_name ? <p>"{props.plant.common_name}"</p> : null}
            </div>

            <div className="flex">
                <p>Watered: {props.plant.watered_date}</p>
                <svg onClick={() => props.updateWatered(props.idx)} className="clickable" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <textarea placeholder="Leave notes here" value={props.plant.note} onChange={(e) => props.updateNote(e, props.idx)} />
        
        </div>
    )

}