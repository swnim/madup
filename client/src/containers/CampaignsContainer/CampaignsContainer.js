import React, { Component } from 'react';
import { Campaigns } from '../../components';
import * as services from '../../services/services';

class CampaignsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            offset: 0,
            campaigns: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.loadCampaigns(0);
    }

    loadCampaigns = async (offset) => {
        this.setState({
            loading: true
        });

        const campaigns = await services.getCampaigns(offset);

        this.setState({
            loading: false,
            offset: offset + 12,
            campaigns: this.state.campaigns.concat(campaigns.data)
        });
    }

    handleClick() {
        this.loadCampaigns(this.state.offset);
    }

    handleScroll(event) {
        let windowHeight = document.body.scrollHeight;
        let innerHeight = window.innerHeight;
        let scrollTop = event.srcElement.body.scrollTop;
        let totalScrolled = scrollTop + innerHeight;

        if (totalScrolled + 100 > windowHeight) {
            this.getCampaigns(this.state.offset);
        }
    }

    render() {
        const {loading, offset, campaigns} = this.state;

        return (
            <Campaigns
                loading={loading}
                offset={offset}
                campaigns={campaigns}
                onClick={this.handleClick}
            />
        );
    }
}

export default CampaignsContainer;