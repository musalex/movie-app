import React, { Component } from 'react';
// import css from './App.css';
import MoviesPage from './containers/MoviesPage/MoviesPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/movies/popular/page/:id" component={MoviesPage} />
            <Route path="/movies/search/:queryName/page/:id" component={MoviesPage} />
            <Redirect to="/movies/popular/page/1" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
