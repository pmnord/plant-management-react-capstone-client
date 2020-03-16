import React from 'react';
import { Switch } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import LoginForm from '../LoginForm/LoginForm'
import Garden from '../Garden/Garden'
import PlantSearch from '../PlantSearch/PlantSearch'
import PlantDetails from '../PlantDetails/PlantDetails'

import PrivateRoute from '../../routes/PrivateRoute'
import PublicOnlyRoute from '../../routes/PublicOnlyRoute'
import TokenService from '../../services/token-service';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: TokenService.hasToken()
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true })
  }

  handleLogout = () => {
    this.setState({ loggedIn: false })
  }

  render() {
    return (
      <div className="app">
        <Header handleLogout={this.handleLogout} />
        {/* <h2 className="demo-banner" style={{ backgroundColor: 'yellow', textAlign: 'center' }}>This is just a demo. Please take a moment to <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScdox25FniERn2kj8FeQ7NKcxT4rrgI6f0TF0snnW07Y9g_vw/viewform?usp=sf_link">leave feedback on this form.</a> Thanks!</h2> */}
        
        <main className="main">
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={() => <RegistrationForm handleLogin={this.handleLogin} />}
            />
            <PublicOnlyRoute
              exact
              path={'/login'}
              component={() => <LoginForm handleLogin={this.handleLogin} />}
            />
            <PrivateRoute
              path={'/garden'}
              component={(r) => <Garden
                updateNote={this.updateNote}
                updateWatered={this.updateWatered}
                router={r} />
              }
            />
            <PrivateRoute
              exact
              path={'/plant-search'}
              component={PlantSearch}
            />
            <PrivateRoute
              path={'/plant/:plant_id'}
              component={(r) => <PlantDetails 
                  addPlant={this.addPlant} 
                  router={r} />}
            />
          </Switch>
        </main >
        <Footer />
      </div>
    )
  }
}

export default App