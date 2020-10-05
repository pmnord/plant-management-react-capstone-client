import React from 'react';
import { Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PlantSearchPage from './pages/PlantSearchPage/PlantSearchPage';
import PlantDetailsPage from './pages/PlantDetailsPage/PlantDetailsPage';
import GardenPage from './pages/GardenPage/GardenPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import PrivateRoute from './routes/PrivateRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';
import TokenService from './services/tokenService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: TokenService.hasToken(),
      username: null,
    };
  }

  // Keeps the Header component in sync with whether the user is logged in or not
  updateLoggedIn = (username) => {
    this.setState({ loggedIn: TokenService.hasToken(), username });
  };

  render() {
    return (
      <div className='app'>
        <Header
          username={this.state.username}
          handleLogout={this.updateLoggedIn}
        />
        <main className='main'>
          <ErrorBoundary>
            <Switch>
              <PublicOnlyRoute
                exact
                path={'/'}
                component={(router) => (
                  <HomePage
                    updateLoggedIn={this.updateLoggedIn}
                    router={router}
                  />
                )}
              />
              <PublicOnlyRoute
                exact
                path={'/login'}
                component={(router) => (
                  <LoginPage
                    updateLoggedIn={this.updateLoggedIn}
                    router={router}
                  />
                )}
              />
              <PrivateRoute
                path={'/garden'}
                component={(router) => <GardenPage router={router} />}
              />
              <PrivateRoute exact path={'/plant'} component={PlantSearchPage} />
              <PrivateRoute
                path={'/plant/:plant_id'}
                component={(router) => <PlantDetailsPage router={router} />}
              />
            </Switch>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
