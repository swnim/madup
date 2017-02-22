import axios from 'axios';
import React from 'react';
import Card from './Card';
import './Cards.css';

class Cards extends React.Component {
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
        window.addEventListener('scroll', this.handleScroll);

        this.getCards();
    }

    getCards() {
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

                this.getCards();
            }
        }
    }

    render() {
        return (
            <div id="cards">
                {this.state.cards.map(function(card, key) {
                    return (<Card key={key}
                                   name={card.name}
                                   icon_url={card.icon_url}/>
                    );
                })}
                <div id="loading">
                    <button className="button" onClick={this.getCards.bind(this)}>Loading...</button>
                </div>
            </div>
        );
    }
}

export default Cards;