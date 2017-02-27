import React from 'react';
import { Campaign } from '../../components';
import { Button } from 'semantic-ui-react'
import './Campaigns.css';

const Campaigns = ({ loading, offset, campaigns, onClick }) => {
    let campaignList = campaigns.map((campaign, key) => {
        return (<Campaign campaign={campaign} key={key}/>);
    });

    return (
        <div className="Campaigns">
            { campaignList }
            <div id="loading">
                <Button fluid loading={loading} onClick={() => onClick()}>More...</Button>
            </div>
        </div>
    );
}

export default Campaigns;