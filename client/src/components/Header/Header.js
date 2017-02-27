import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

const Header = ({ activeItem }) => (
    <Menu className="Menu" fixed="top" inverted>
        <Menu.Item>
            <img src="http://revenue.madup.com/images/logo.svg" alt="logo" style={{width:'98px'}}/>
        </Menu.Item>
        <Menu.Item as={Link} to="/" name="Home" active={activeItem === 'home'}/>
        <Menu.Item as={Link} to="/campaigns" name="캠페인" active={activeItem === 'campaigns'}/>
        <Menu.Item as={Link} to="/affiliates" name="매체" active={activeItem === 'affiliates'}/>
    </Menu>
);

export default Header;