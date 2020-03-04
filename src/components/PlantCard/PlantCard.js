import React from 'react'

export default function Garden(props) {

    return (
        <div className='plant-card'>
            <div className='plant-card__header'>
                <h3>{props.plant.scientific_name}</h3>
                <img src={props.plant.image} />
                {props.plant.common_name ? <p>"{props.plant.common_name}"</p> : null}
                {/* <p>"{props.plant.common_name}"</p> */}
            </div>
            <p>Genus: {props.plant.genus}</p>
            <p>Duration: {props.plant.duration}</p>
            <textarea placeholder="Leave notes here" value={props.plant.note} onChange={(e) => props.updateNote(e, props.idx)} />
        </div>
    )

}