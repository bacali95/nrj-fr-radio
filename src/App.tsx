import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RadioList from './components/RadioList';
import Player from './components/Player';

import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={RadioList} />
      </Switch>
      <Player />
    </Router>
  );
}
