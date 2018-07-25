import React, { Component } from 'react';
// import css from './App.css';
import MoviesPage from './containers/MoviesPage/MoviesPage';
import MovieInfo from './containers/MovieInfo/MovieInfo';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/movies/popular/page/:pageNumber" render = {
              (props) => <MoviesPage {...props} section="popular" />
            } />
            <Route path="/movies/search/:queryName/page/:pageNumber" render = {
              (props) => <MoviesPage {...props} section="search" />
            } />
            <Route path="/movies/favorite/page/:pageNumber" render = {
              (props) => <MoviesPage {...props} section="favorites" />
            } />
            <Route path="/movie/:id" component={MovieInfo} />
            <Redirect to="/movies/popular/page/1" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;