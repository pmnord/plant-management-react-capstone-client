import React from 'react';
import { Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PlantSearchRoute from './routes/PlantSearchRoute';
import PlantDetailsRoute from './routes/PlantDetailsRoute';
import GardenRoute from './routes/GardenRoute';
import LoginRoute from './routes/LoginRoute';
import HomeRoute from './routes/HomeRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import PrivateRoute from './routes/utils/PrivateRoute';
import PublicOnlyRoute from './routes/utils/PublicOnlyRoute';
import TokenService from './services/tokenService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: TokenService.hasToken()
    };
  }

  // Keeps the Header component in sync with whether the user is logged in or not for conditional rendering purposes
  updateLoggedIn = () => {
    this.setState({ loggedIn: TokenService.hasToken() });
  }

  render() {
    return (
      <div className="app">
        <Header handleLogout={this.updateLoggedIn} />
        <main className="main">
          <ErrorBoundary>
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
                path={'/plant'}
                component={PlantSearchRoute}
              />
              <PrivateRoute
                path={'/plant/:plant_id'}
                component={(router) => <PlantDetailsRoute router={router} />}
              />
            </Switch>
          </ErrorBoundary>
        </main >
        <Footer />
      </div>
    );
  }
};

export default App;