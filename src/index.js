import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import './index.css';
import { Router, Route, Link, browserHistory } from 'react-router'
import FilmComponent from './Film.js'
import SimilarFilm from './SimilarFilm.js'




ReactDOM.render(
(<Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/:filmName" component = {FilmComponent}  />
  
  </Router>),
  document.getElementById('root')
);
