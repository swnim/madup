import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: 'home' };
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(name) {
        this.setState({ activeItem: name });
    }

    render() {
        return (
            <Menu inverted fixed='top'>
              <Menu.Item>
                <img src='http://revenue.madup.com/images/logo.svg' style={{width:"98px"}}/>
              </Menu.Item>
              <Menu.Item as={Link} to="/" name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick.bind(null, 'home')} />
              <Menu.Item as={Link} to="/campaigns" name='campaigns' active={this.state.activeItem === 'campaigns'} onClick={this.handleItemClick.bind(null, 'campaigns')} />
            </Menu>
        );
    }
}