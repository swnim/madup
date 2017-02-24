import React from 'react';
import Header from './components/Header';
import { Container } from 'semantic-ui-react'

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Container fluid textAlign="left" style={{marginTop:"70px"}}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default App;