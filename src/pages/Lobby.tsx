import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import Heading from '../components/Heading';
import Settings from '../components/Settings';
import UsernameForm from '../components/forms/UsernameForm';
import UsersList from '../components/UsersList';
import {
    disconnectSocket,
    initiateSocket,
    subscribeToGame,
} from '../hooks/useSocket';
import { setError, setGameData, setLobbyId } from '../redux/actions';
import { AllState } from '../redux/reducers';
import GameView from '../components/GameView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { isObjectLiteralElement } from 'typescript';

interface Props {}

const Lobby = ({}: Props) => {
    const { lobbyId } = useParams<{ lobbyId: string }>();

    const history = useHistory();
    const dispatch = useDispatch();
    const username = useSelector<AllState, AllState['username']>(
        state => state.username,
    );
    const userId = useSelector<AllState, AllState['userId']>(
        state => state.userId,
    );
    const gameData = useSelector<AllState, AllState['gameData']>(
        state => state.gameData,
    );
    const error = useSelector<AllState, AllState['error']>(
        state => state.error,
    );

    const [loading, setLoading] = useState<boolean>(true);

    const isMonitor = useMediaQuery('(min-width: 1000px)');

    useEffect(() => {
        if (lobbyId) {
            initiateSocket(lobbyId, username, dispatch, err => {
                console.log('errr!>?', err);
                if (err) {
                    setError(err, dispatch);
                    history.push('/');
                    return;
                }
            });
            setLobbyId(lobbyId, dispatch);
            subscribeToGame((err, gameData) => {
                if (err) {
                    history.push('/');
                    return;
                }
                if (gameData) {
                    setGameData(gameData, dispatch);
                }
            });
            setLoading(false);
        }
        return () => {
            disconnectSocket();
        };
    }, [lobbyId]);

    if (gameData.gameOn && !username)
        setError('Game Started without you', dispatch);
    if (error) return <Redirect to='/' />;
    if (loading) return <h1>Loading...</h1>;

    if (isMonitor)
        return (
            <Layout>
                <Heading>{`Lobby ${lobbyId.toUpperCase()}`}</Heading>
                <Row>
                    <Col flex={3}>
                        {username ? null : <UsernameForm />}
                        {gameData.gameOn ? (
                            <GameView gameData={gameData} />
                        ) : null}
                        {!gameData.gameOn ? <UsersList flex={1} /> : null}
                    </Col>
                    <Col flex={2}>
                        <Chat isMonitor={isMonitor} />
                        {gameData.gameOn ? <UsersList flex={1} /> : null}
                        {gameData.hostId === userId && !gameData.gameOn ? (
                            <Settings />
                        ) : null}
                    </Col>
                </Row>
            </Layout>
        );

    return (
        // <Layout h={`${90 + 10 * Object.values(gameData.users).length}vh`}>
        <Layout>
            <Row>
                <Col flex={1}>
                    <Heading>{`Lobby ${lobbyId.toUpperCase()}`}</Heading>
                    {username ? null : <UsernameForm />}
                    {gameData.gameOn ? <GameView gameData={gameData} /> : null}
                    <UsersList />
                    <Chat isMonitor={isMonitor} />
                    {gameData.hostId === userId && !gameData.gameOn ? (
                        <Settings />
                    ) : null}
                </Col>
            </Row>
        </Layout>
    );
};

export default Lobby;

const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex: 1;
`;

interface FlexProps {
    flex: number;
}
const Col = styled.div<FlexProps>`
    flex: ${({ flex }) => flex};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
