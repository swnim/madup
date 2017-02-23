import React from 'react';
import axios from 'axios';
import { Header, Image, Table } from 'semantic-ui-react';

class Affiliates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
            affiliates: []
        };
    }

    componentDidMount() {
        this.getAffiliates();
    }

    getAffiliates() {
        axios.get('/api/v1/campaigns/' + this.props.campaignId)
            .then(res => {
                this.setState({
                    loaded: false,
                    affiliates: res.data
                });
            })
            .catch(response => { console.log(response) });
    }

    render() {
        return (
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>매체</Table.HeaderCell>
                <Table.HeaderCell>Install</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.affiliates.map((affiliate, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Image src={affiliate.icon_url} shape='rounded' size='mini' />
                        <Header.Content>
                          {affiliate.name}
                          <Header.Subheader>Human Resources</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {affiliate.install}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )
    }
}

export default Affiliates