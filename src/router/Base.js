import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home,
	GameDetails,
	Topic,
  User,
  GameList
} from '../containers';

class Base extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/gamedetails' component={GameDetails} />
          <Route exact path='/topic' component={Topic} />
          <Route exact path='/user' component={User} />
          <Route exact path='/gamelist' component={GameList} />
        </div>
      </Router>
    );
  }
  componentWillMount () {
  }
}
export default connect()(Base);
