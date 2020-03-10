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
import ApiService from '../../services/api-service'

import PrivateRoute from '../../routes/PrivateRoute'
import PublicOnlyRoute from '../../routes/PublicOnlyRoute'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header />
        {/* <h2 className="demo-banner" style={{ backgroundColor: 'yellow', textAlign: 'center' }}>This is just a demo. Please take a moment to <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScdox25FniERn2kj8FeQ7NKcxT4rrgI6f0TF0snnW07Y9g_vw/viewform?usp=sf_link">leave feedback on this form.</a> Thanks!</h2> */}
        <main className="main">

          <Switch>


            <Route
              exact
              path={'/'}
              component={RegistrationForm}
            />
            <Route
              exact
              path={'/login'}
              component={LoginForm}
            />

            <Route
              path={'/garden/:userid'}
              render={() => <Garden
                updateNote={this.updateNote}
                updateWatered={this.updateWatered} />
              }
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