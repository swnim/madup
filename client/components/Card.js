import React from 'react';
import './Card.css';


class Card extends React.Component {
    render() {
        let styles = {
            imgStyle: {
                width: "100%",
                borderRadius: "5px 5px 0 0"
            }
        };

        return (
            <div className="card">
                <img src={this.props.iconUrl} style={styles.imgStyle}/>
                <div className="container">
                    <h4><b>{this.props.name}</b></h4>
                    <p>{this.props.email}</p>
                </div>
            </div>
        );
    }
}

export default Card;