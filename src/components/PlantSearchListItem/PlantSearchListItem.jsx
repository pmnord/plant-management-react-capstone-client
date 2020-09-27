import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/tokenService";

import "./PlantSearchListItem.css";

// List Item representing a search result when a user searches for plants in the Trefle database
export default function PlantSearchListItem(props) {
  function handleAddPlant() {
    return fetch(`${config.API_ENDPOINT}/garden`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": config.API_KEY,
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
      body: JSON.stringify({
        trefle_id: props.trefle_id,
        scientific_name: props.scientific_name,
        common_name: props.common_name,
        image: props.image_url,
        family: props.family,
        family_common_name: props.family_common_name,
        genus: props.genus,
      }),
    })
      .then((res) =>
        !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : props.push("/garden")
      )
      .catch((res) => console.log(res.error));
  }

  function capitalize(str) {
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <li className="plant-search__list-item PlantSearchListItem">
      {props.image_url ? (
        <img
          className="PlantSearchListItem__img"
          src={props.image_url}
          alt={props.scientific_name}
        />
      ) : <div>Image not available</div>}

      <div className="plant-search__plant-names">
        <h3>
          <strong>{props.scientific_name}</strong>
        </h3>
        {props.common_name ? <p>'{capitalize(props.common_name)}'</p> : <p></p>}
      </div>
      <div>
        <p>{props.family}</p>
        <p>{props.family_common_name}</p>
      </div>
      <div className="plant-search__list-item__buttons">
        <Link to={`/plant/${props.trefle_id}`}>
          <button className="btn">See Details</button>
        </Link>
        <button className="btn" onClick={handleAddPlant}>
          Add to Garden
        </button>
      </div>
    </li>
  );
}
