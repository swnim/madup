import React from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react'
import './Card.css';


class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    getUrl(campaignId) {
        return "/campaigns/" + campaignId;
    }

    handleClick(campaignId) {
        window.location.href = "/campaigns/" + campaignId;
    }

    render() {
        let styles = {
            imgStyle: {
                width: "100px",
                height: "100px",
                display: "block",
                margin: "30px auto 10px auto",
                borderRadius: "50%"
            }
        };

        if (this.props.campaigns) {
            var platforms = this.props.campaigns.map((campaign, key) => {
                return(
                    <Button primary
                            key={key}
                            as={Link}
                            to={this.getUrl(campaign.id)}
                            size="small">{campaign.platform}</Button>
                );
            });
        }

        return (
            <div className="card">
                <img src={this.props.icon_url} style={styles.imgStyle}/>
                <div className="container">
                    <h4><b>{this.props.name}</b></h4>
                    <div className="platforms">
                        {platforms}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
