import axios from 'axios';
import React from 'react';
import Card from './Card';

class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
            cards: []
        };
    }

    componentDidMount() {
        axios.get('/api/advertisers')
            .then(res => {
                this.setState({
                    loaded: false,
                    cards: res.data
                });
            })
            .catch(response => { console.log(response) });
    }

    render() {
        return (
            <div id="cards">
                {this.state.cards.map(function(card, key) {
                    return (<Card key={key}
                                  name={card.name}
                                  iconUrl={card.iconUrl}/>
                    );
                })}
            </div>
        );
    }
}

export default Cards;