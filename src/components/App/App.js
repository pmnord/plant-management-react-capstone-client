import React from 'react';
import { Switch } from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import PlantSearchRoute from '../../routes/PlantSearchRoute'
import PlantDetailsRoute from '../../routes/PlantDetailsRoute'
import GardenRoute from '../../routes/GardenRoute'
import LoginRoute from '../../routes/LoginRoute'
import HomeRoute from '../../routes/HomeRoute'

import PrivateRoute from '../../routes/utils/PrivateRoute'
import PublicOnlyRoute from '../../routes/utils/PublicOnlyRoute'
import TokenService from '../../services/token-service'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: TokenService.hasToken()
    }
  }

  updateLoggedIn = () => {
    this.setState({ loggedIn: TokenService.hasToken() })
  }

  render() {
    return (
      <div className="app">
        <Header handleLogout={this.updateLoggedIn} />

        {/* <h2 className="demo-banner" style={{ backgroundColor: 'yellow', textAlign: 'center' }}>This is just a demo. Please take a moment to <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScdox25FniERn2kj8FeQ7NKcxT4rrgI6f0TF0snnW07Y9g_vw/viewform?usp=sf_link">leave feedback on this form.</a> Thanks!</h2> */}

        <main className="main">
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={(router) => <HomeRoute updateLoggedIn={this.updateLoggedIn} router={router} />}
            />
            <PublicOnlyRoute
              exact
              path={'/login'}
              component={(router) => <LoginRoute updateLoggedIn={this.updateLoggedIn} router={router} />}
            />
            <PrivateRoute
              path={'/garden'}
              component={(router) => <GardenRoute router={router} />}
            />
            <PrivateRoute
              exact
              path={'/plant-search'}
              component={PlantSearchRoute}
            />
            <PrivateRoute
              path={'/plant/:plant_id'}
              component={(router) => <PlantDetailsRoute router={router} />}
            />
          </Switch>
        </main >

        <Footer />
      </div>
    )
  }
}

export default App