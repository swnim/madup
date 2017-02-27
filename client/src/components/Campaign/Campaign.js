import React from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react'
import './Campaign.css';

const Campaign = ({ campaign }) => {
    let platforms = campaign.platforms ? campaign.platforms.map((platform, key) => {
        let campaignUrl = '/campaigns/' + platform.id;

        return (
            <Button primary
                    key={key}
                    as={Link}
                    to={campaignUrl}
                    size="small">{platform.name}</Button>
        );
    }) : '';

    return (
        <div className="Campaign">
            <img src={campaign.icon_url} className="CampaignImage" alt={campaign.name}/>
            <div className="CampaignName">
                <h4><b>{campaign.name}</b></h4>
                <div className="CampaignPlatforms">
                    {platforms}
                </div>
            </div>
        </div>
    );
}

export default Campaign;
