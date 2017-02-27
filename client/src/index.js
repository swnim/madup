import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HomeContainer, CampaignsContainer } from './containers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
            <Route path="home" component={HomeContainer}/>
            <Route path="campaigns" component={CampaignsContainer}/>
        </Route>
    </Router>,
    document.querySelector('#root')
);
