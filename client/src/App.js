import React from 'react';
import { Container } from 'semantic-ui-react';
import { Header } from './components';

const App = ({ routes, children }) => {
    let activeItem = routes[1] ? routes[1].path : 'home';

    return (
        <div className="App">
            <Header activeItem={activeItem}/>
            <Container fluid style={{marginTop:'54px'}}>
                { children }
            </Container>
        </div>
    );
}

export default App;
