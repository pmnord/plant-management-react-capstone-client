import React from 'react';
import config from '../config';
import TokenService from '../services/tokenService';
import xss from 'xss';
import Toolbar from '../components/Toolbar/Toolbar';

/* Provides images and data about a specific plant from the Trefle API.

As the Trefle API is being updated with new data still, it's better to fetch on every load than
to cache the data on our own server. */
export default class PlantDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      details: {},
      images: [],
      plant: {},
      raw_data: false,
      loading: true,
    };
  }

  componentDidMount = () => {
    const trefle_id = this.props.router.match.params.plant_id;

    fetch(`${config.API_ENDPOINT}/plant/${trefle_id}`, {
      headers: {
        'api-key': config.API_KEY,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((data) => {
        const details = {
          scientific_name: data.scientific_name,
          common_name:
            data.common_name.charAt(0).toUpperCase() +
            data.common_name.slice(1),
          plant_class: data.class ? data.class.name : null,
          plant_order: data.order ? data.order.name : null,
          family: data.family ? data.family.name : null,
          family_common_name: data.family_common_name,
          genus: data.genus.name,
          duration: data.duration,
          shade_tolerance: data.main_species.growth.shade_tolerance,
          drought_tolerance: data.main_species.growth.drought_tolerance,
          flower_color: data.main_species.flower.color,
        };
        console.log(data);

        this.setState({
          details,
          images: [data.image_url],
          plant: data,
          complete_data: data.main_species.complete_data,
          loading: false,
        });
      })
      .catch((res) => this.setState({ error: res.error }));
  };

  labelize(str) {
    // Uppercase the first char of every word
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  handleAddPlant = () => {
    // Add a plant to the user's garden
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
    } = this.state.details; // Destructure the variables the server needs off of state

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
    };

    return fetch(`${config.API_ENDPOINT}/garden`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
        Authorization: `Bearer ${TokenService.getToken()}`,
      },
      body: JSON.stringify(plantToAdd),
    })
      .then((res) =>
        !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : this.props.router.history.push('/garden')
      )
      .catch((res) => console.log(res.error));
  };

  recurseDataIntoLists(data) {
    // For displaying raw data, recursively create <ul> and <li> elements
    let listItems = '';

    for (let el in data) {
      if (typeof data[el] === 'object') {
        listItems += `<li>${el}: ${this.recurseDataIntoLists(data[el])}</li>`;
      } else {
        listItems += `<li>${el}: ${data[el]}</li>`;
      }
    }

    return `<ul>${listItems}</ul>`;
  }

  toggleRawData = () => {
    return this.setState({ raw_data: !this.state.raw_data });
  };

  render() {
    return (
      <div className='plant-details'>
        <Toolbar></Toolbar>
        {!this.state.error && this.state.loading && (
          <h3>Loading your plant...</h3>
        )}
        {this.state.complete_data === false ? (
          <h2>
            The data for this plant is tagged <strong>'incomplete'</strong> in
            the Trefle.io database and may have limited information.
          </h2>
        ) : null}

        <div className='plant-details__innerdiv'>
          <div className='plant-details__images'>
            {this.state.images &&
              this.state.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`${this.state.details.scientific_name}`}
                />
              ))}
          </div>
          <div className='plant-details__details'>
            {Object.entries(this.state.details).map((detail, idx) =>
              detail[1] ? (
                <p key={idx}>
                  <strong>{this.labelize(detail[0])}: </strong>
                  {detail[1]}
                </p>
              ) : null
            )}
            {this.state.details.genus ? (
              <a
                rel='noopener noreferrer'
                target='_blank'
                href={`https://en.wikipedia.org/wiki/${this.state.details.genus}`}
              >
                <p>Wikipedia</p>
              </a>
            ) : null}

            {!this.state.loading && (
              <button onClick={this.handleAddPlant}>Add to My Garden</button>
            )}
          </div>
        </div>
        {!this.state.loading && (
          <button
            className='plant-details__raw-data-button'
            onClick={this.toggleRawData}
          >
            Raw Data
          </button>
        )}
        {this.state.raw_data && (
          <div className='plant-details__raw-data'>
            <a
              download={`${this.state.plant.scientific_name
                .toLowerCase()
                .replace(' ', '_')}.json`}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(this.state.plant)
              )}`}
            >
              Download as JSON
            </a>
            {/* Using dangerouslySetInnerHTML potentially exposes us if the Trefle API is compromised,
                            so we're using the xss package to escape any dangerous tags from the code */}
            <div
              dangerouslySetInnerHTML={{
                __html: xss(this.recurseDataIntoLists(this.state.plant)),
              }}
            ></div>
          </div>
        )}
      </div>
    );
  }
}
