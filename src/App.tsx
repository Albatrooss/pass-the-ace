import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/notfound' component={NotFound} />
                <Route exact path='/:lobbyId' component={Lobby} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
