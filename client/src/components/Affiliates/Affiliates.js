import React from 'react';
import { Menu, Label, Segment, Dimmer, Loader, Image } from 'semantic-ui-react'

const Affiliates = ({ affiliates, loading }) => {
    let affiliateList = affiliates.map((affiliate, key) => (
        <Menu.Item name={affiliate.name} key={key}>
          <Label>{ affiliate.install || '0' }</Label>
          { affiliate.name }
        </Menu.Item>
    ));

    return (
        <Menu vertical>
            <Dimmer active={loading}>
                <Loader size="small">Loading</Loader>
            </Dimmer>

            { affiliateList }
        </Menu>
    );
}

export default Affiliates;
