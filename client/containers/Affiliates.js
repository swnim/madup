import axios from 'axios';
import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

export default class Affiliates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
            offset: 0,
            cards: []
        };
    }

    componentDidMount() {
        this.getAffiliates();
    }

    getAffiliates() {
        this.setState({
            loaded: false
        });

        setTimeout(() => {
            axios.get('/api/v1/affiliates?limit=12&offset=' + this.state.offset)
                .then(res => {
                    this.setState({
                        loaded: true,
                        offset: this.state.offset + 12,
                        cards: this.state.cards.concat(res.data)
                    });
                })
                .catch(response => { console.log(response) });
        }, 150);
    }

    handleScroll(event) {
        let windowHeight = document.body.scrollHeight;
        let innerHeight = window.innerHeight;
        let scrollTop = event.srcElement.body.scrollTop;
        let totalScrolled = scrollTop + innerHeight;

        if (totalScrolled + 100 > windowHeight) {
            if (this.state.loaded) {
                this.setState({
                    loaded: false,
                });

                this.getAffiliates();
            }
        }
    }

    render() {
        return (
            <div>
                <Card.Group>
                    {this.state.cards.map((card, key) => {
                        return (
                            <Card key={key}>
                              <Card.Content>
                                <Image floated='right' size='mini' src={card.icon_url} />
                                <Card.Header>{card.name}</Card.Header>
                                <Card.Meta>
                                  {card.code}
                                </Card.Meta>
                              </Card.Content>
                              <Card.Content>
                                <div className='ui two buttons'>
                                  <Button primary>통계</Button>
                                  <Button secondary>설정</Button>
                                </div>
                              </Card.Content>
                            </Card>
                        );
                    })}
                </Card.Group>

                <div id="loading" style={{textAlign:"center", marginTop:"20px"}}>
                    <Button fluid loading={!this.state.loaded} onClick={this.getAffiliates.bind(this)}>More...</Button>
                </div>
            </div>
        );
    }
}