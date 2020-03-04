import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import LoginForm from '../LoginForm/LoginForm'
import Garden from '../Garden/Garden'
import PlantSearch from '../PlantSearch/PlantSearch'
import PlantDetails from '../PlantDetails/PlantDetails'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [
        {
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: ''
        },
        {
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: ''
        },
        {
          common_name: "tarovine",
          scientific_name: "Monstera deliciosa",
          genus: "Monstera",
          duration: "Perennial",
          image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Monstera_deliciosa3.jpg",
          note: ''
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

  render() {
    return (
      <div className="app" >
        <Header />
        <h2 style={{ backgroundColor: 'yellow', textAlign: 'center' }}>This is just a demo. Please take a moment to <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScdox25FniERn2kj8FeQ7NKcxT4rrgI6f0TF0snnW07Y9g_vw/viewform?usp=sf_link">leave feedback on this form.</a> Thanks!</h2>
        <main className="main">

          <Switch>
            <Route
              exact
              path={'/'}
              component={LoginForm}
            />
            <Route
              exact
              path={'/login'}
              component={LoginForm}
            />
            <Route
              path={'/garden/:username'}
              render={() => <Garden plants={this.props.plants} updateNote={this.updateNote} />}
            />
            <Route
              exact
              path={'/plant-search'}
              component={PlantSearch}
            />
            <Route
              path={'/plant/:plant_id'}
              component={PlantDetails}
            />
          </Switch>
        </main >
        <Footer />
      </div>
    );
  }
}