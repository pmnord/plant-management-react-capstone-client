import React from 'react';
import { Route, Switch } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Switch>
          <Route 
          exact
          path={'/'}
          component={null}
          />
          <Route
            exact
            path={'/login'}
            component={LoginForm}
          />
        </Switch>
      </main >
      <Footer />
    </div>
  );
}

export default App;
