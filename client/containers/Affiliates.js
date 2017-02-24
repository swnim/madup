import React from 'react';
import axios from 'axios';
import { Header, Image, Table, Label, Menu, Grid, Container, Dimmer, Loader } from 'semantic-ui-react';

class Affiliates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true,
            affiliates: []
        };
    }

    componentDidMount() {
        setTimeout(() => this.getAffiliates(), 300);
    }

    getAffiliates() {
        axios.get('/api/v1/campaigns/' + this.props.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    active: false,
                    campaignId: res.data.id,
                    campaignName: res.data.name,
                    campaignIconUrl: res.data.icon_url,
                    affiliates: res.data.affiliates
                });
            })
            .catch(response => { console.log(response) });
    }

    render() {
        return (
        <div>
          <Dimmer active={this.state.active}>
            <Loader size='big'>Loading</Loader>
          </Dimmer>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Header as='h2'>
                  <Image shape='circular' src={this.state.campaignIconUrl} />
                  {' '}{this.state.campaignName}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu vertical style={{textAlign:'left'}}>
                  {this.state.affiliates.map((affiliate, key) => {
                    return (
                        <Menu.Item key={key}>
                          <Label>{affiliate.install || '0'}</Label>
                          {affiliate.name}
                        </Menu.Item>
                    );
                  })}
                </Menu>
              </Grid.Column>
              <Grid.Column width={12}>
                <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        )
    }
}

export default Affiliates