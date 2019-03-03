import React, { Component } from 'react';
import './App.scss';
import MovieView from '../MovieView/MovieView';
import MovieDetails from '../MovieDetails/MovieDetails';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={MovieView}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:id`}
            component={MovieDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
