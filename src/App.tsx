import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Heading from './components/Heading';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import NotFound from './pages/NotFound';
import { SOCKET_URL } from './util/constants';

function App() {
    const [waitingForHeroku, setWaitingForHeroku] = useState<boolean>(true);
    const [retries, setRetries] = useState<number>(20);

    const pingServer = async () => {
        if (retries === 0) {
            return;
        }
        try {
            const response = await fetch(SOCKET_URL + 'ping');
            console.log('1', response);
            const resp = await response.json();
            console.log('2', resp);
            if (!resp.connected) {
                throw new Error('Not connected yet');
            }
        } catch (error) {
            console.log(error.message || error);
            await new Promise(res => setTimeout(res, 1000));
            setRetries(prev => prev - 1);
            return;
        }
        setWaitingForHeroku(false);
    };
    useEffect(() => {
        pingServer();
    }, [retries]);

    if (waitingForHeroku)
        return (
            <Layout>
                <Heading>Waiting for Server to Boot up...</Heading>
                <Heading variant='h4'>{retries.toString()}</Heading>
            </Layout>
        );

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
