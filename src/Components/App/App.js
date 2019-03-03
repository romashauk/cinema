import React, { Component } from 'react';
import './App.scss';
import MovieView from '../MovieView/MovieView';
import MovieDetails from '../MovieDetails/MovieDetails';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path={`/`} component={MovieView} />
        <Route path={`/:id`} component={MovieDetails} />
      </div>
    );
  }
}

export default App;
