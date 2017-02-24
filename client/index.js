import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Campaigns from './containers/Campaigns';
import Affiliates from './containers/Affiliates';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="campaigns" component={Campaigns}/>
      <Route path="campaigns/:id" component={Affiliates}/>
    </Route>
  </Router>,
  document.querySelector('#root')
);
