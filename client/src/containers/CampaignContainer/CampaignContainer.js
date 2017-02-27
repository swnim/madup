import React, { Component } from 'react';
import { Affiliates } from '../../components';
import * as services from '../../services/services';

class CampaignContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            campaign: {},
            affiliates: []
        };
    }

    componentDidMount() {
        this.loadCampaign(this.props.params.id);
    }

    loadCampaign = async (campaignId) => {
        this.setState({
            loading: true
        });

        const campaign = await services.getCampaign(campaignId);

        this.setState({
            loading: false,
            campaign: campaign.data,
            affiliates: campaign.data.affiliates
        });
    }

    render() {
        const {loading, affiliates} = this.state;

        return (
            <Affiliates affiliates={affiliates} loading={loading}/>
        );
    }
}

export default CampaignContainer;