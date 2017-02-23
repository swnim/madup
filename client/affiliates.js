import React from 'react';
import ReactDOM from 'react-dom';
import Affiliates from './components/Affiliates';

const campaignId = () => {
    const paths = window.location.pathname.split('/');

    return paths[paths.length - 1];
};

ReactDOM.render(
    <Affiliates campaignId={campaignId()}/>,
    document.querySelector('#app')
);