import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import LoginForm from '../LoginForm/LoginForm'
import Garden from '../Garden/Garden'
import PlantSearch from '../PlantSearch/PlantSearch'
import PlantDetails from '../PlantDetails/PlantDetails'
import moment from 'moment'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [
        {
          id: "157554",
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: '',
          last_watered: '',
        },
        {
          id: "157554",
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: '',
          last_watered: '',
        },
        {
          id: "157554",
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: '',
          last_watered: '',
        },

      ]
    }
  }

  updateNote = (e, idx) => {
    const newValue = e.target.value
    const newState = { plants: [...this.state.plants] }
    newState.plants[idx].note = newValue

    this.setState(newState)
  }

  updateWatered = (idx) => {
    const newState = { plants: [...this.state.plants] }
    newState.plants[idx].last_watered = moment().format('MMMM Do h:mm a')

    this.setState(newState)
  }

  addPlant = (newPlant) => {
    const newPlants = [...this.state.plants]
    newPlants.push(newPlant)
    const newState = { plants: newPlants }
    this.setState(newState)
  }

  render() {
    return (
      <div className="app">
        <Header />
        <h2 className="demo-banner" style={{ backgroundColor: 'yellow', textAlign: 'center' }}>This is just a demo. Please take a moment to <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScdox25FniERn2kj8FeQ7NKcxT4rrgI6f0TF0snnW07Y9g_vw/viewform?usp=sf_link">leave feedback on this form.</a> Thanks!</h2>
        <main className="main">

          <Switch>
            <Route
              exact
              path={'/'}
              render={() => <Garden plants={this.state.plants} updateNote={this.updateNote} />}
            />
            <Route
              exact
              path={'/login'}
              component={LoginForm}
            />
            <Route
              path={'/garden/:username'}
              render={() => <Garden plants={this.state.plants} updateNote={this.updateNote} updateWatered={this.updateWatered} />}
            />
            <Route
              exact
              path={'/plant-search'}
              component={PlantSearch}
            />
            <Route
              path={'/plant/:plant_id'}
              render={(r) => <PlantDetails addPlant={this.addPlant} router={r} />}
            />
          </Switch>

        </main >
        <Footer />
      </div>
    );
  }
}