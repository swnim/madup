import React from 'react';
import './Card.css';


class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles = {
            imgStyle: {
                width: "100px",
                height: "100px",
                display: "block",
                margin: "30px auto 10px auto",
                boarderRadius: "5px"
            }
        };

        if (this.props.campaigns) {
            var campaigns = this.props.campaigns.map((campaign, key) => {
                return(
                    <button className="button green" key={key}>{campaign.platform}</button>
                );
            });
        }

        return (
            <div className="card">
                <img src={this.props.icon_url} style={styles.imgStyle}/>
                <div className="container">
                    <h4><b>{this.props.name}</b></h4>
                    <div className="platforms">
                    {campaigns}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
