import React from 'react'

export default function Garden(props) {

    return (
        <div className='plant-card'>
            <div className='plant-card__header'>
                <h3>{props.plant.common_name}</h3>
                <img src={props.plant.image} />
                <p><em>{props.plant.scientific_name}</em></p>
            </div>
            <p>Genus: {props.plant.genus}</p>
            <p>Duration: {props.plant.duration}</p>
            <textarea value={props.plant.note} onChange={(e) => props.updateNote(e, props.idx)} />
        </div>
    )

}