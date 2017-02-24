import axios from 'axios';
import React from 'react';
import Card from '../components/Card';
import { Button } from 'semantic-ui-react'

class Campaigns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
            offset: 0,
            cards: []
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.getCampaigns();
    }

    getCampaigns() {
        axios.get('/api/v1/advertisers?limit=12&offset=' + this.state.offset)
            .then(res => {
                this.setState({
                    loaded: false,
                    offset: this.state.offset + 12,
                    cards: this.state.cards.concat(res.data)
                });
            })
            .catch(response => { console.log(response) });
    }

    handleScroll(event) {
        let windowHeight = document.body.scrollHeight;
        let innerHeight = window.innerHeight;
        let scrollTop = event.srcElement.body.scrollTop;
        let totalScrolled = scrollTop + innerHeight;

        if (totalScrolled + 100 > windowHeight) {
            if (!this.state.loaded) {
                this.setState({
                    loaded: true,
                });

                this.getCampaigns();
            }
        }
    }

    render() {
        return (
            <div id="cards">
                {this.state.cards.map((card, key) => {
                    return (<Card key={key}
                                  name={card.name}
                                  icon_url={card.icon_url}
                                  campaigns={card.campaigns}/>
                    );
                })}
                <div id="loading" style={{textAlign: "center"}}>
                    <Button fluid onClick={this.getCampaigns.bind(this)}>More...</Button>
                </div>
            </div>
        );
    }
}

export default Campaigns;