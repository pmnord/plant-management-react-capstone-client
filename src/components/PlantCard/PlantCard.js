import React from "react";
import config from "../../config";
import TokenService from "../../services/tokenService";

import "./PlantCard.css";

// Represents a Plant in the User's garden and provides interactions
export default function PlantCard(props) {
  function handleDelete(plant_id) {
    return fetch(`${config.API_ENDPOINT}/garden/${plant_id}`, {
      method: "DELETE",
      headers: {
        "api-key": config.API_KEY,
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
    })
      .then((res) =>
        !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : props.deletePlant(plant_id)
      )
      .catch((err) => console.log(err));
  }

  return (
    <div className="plant-card">
      <div>
          <div className="plant-card__header">
            <div className="plant-card__title">
              <h3>{props.plant.scientific_name}</h3>
            </div>
            <img src={props.plant.image} alt={`${props.plant.scientific_name}`} />
            {props.plant.common_name ? <p>'{props.plant.common_name}'</p> : <p></p>}
          </div>
          
          {/* <div className="plant-card__watered">
                    <button className='btn plant-card__water-button'>
                    <svg onClick={() => props.updateWatered(props.idx)} className="clickable" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </button>
                    <p>Watered: {props.plant.watered_date}</p>
                </div> */}
          
          <label htmlFor={`plant-card__note__${props.idx}`} className="hidden">
            Plant Notes
          </label>
          <textarea
            id={`plant-card__note__${props.idx}`}
            name={`plant-card__note__${props.idx}`}
            placeholder="Leave notes here"
            value={props.plant.note}
            // Updates on Blur, which will fire if a user clicks out or refreshes or navigates away
            onBlur={(e) => props.updateDbNote(e, props.plant.instance_id)}
            onChange={(e) => props.updateNote(e, props.idx)}
          />
      </div>

      <div className="PlantCard__buttons">
        <button
          className="btn"
          onClick={() => props.push(`/plant/${props.plant.trefle_id}`)}
        >
          Details
        </button>
        <button
          className="btn plant-card__btn--delete"
          onClick={() => handleDelete(props.plant.instance_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
