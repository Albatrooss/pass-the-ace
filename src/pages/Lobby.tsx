import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import Settings from '../components/Settings';
import UsernameForm from '../components/UsernameForm';
import UsersList from '../components/UsersList';
import {
    disconnectSocket,
    initiateSocket,
    subscribeToGame,
} from '../hooks/useSocket';
import {
    setGameData,
    setLobbyId,
    setNotFound,
    setUsername,
} from '../redux/actions';
import { AllState } from '../redux/reducers';

interface Props {}

const Lobby = ({}: Props) => {
    const { lobbyId } = useParams<{ lobbyId: string }>();

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
    const notFound = useSelector<AllState, AllState['notFound']>(
        state => state.notFound,
    );

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (lobbyId) {
            initiateSocket(lobbyId, username, dispatch, err => {
                console.log('errr!>?', err);
                if (err) setNotFound(true, dispatch);
            });
            setLobbyId(lobbyId, dispatch);
            subscribeToGame((err, gameData) => {
                setGameData(gameData, dispatch);
            });
            setLoading(false);
        }
        return () => {
            disconnectSocket();
        };
    }, [lobbyId]);

    if (notFound) return <Redirect to='/' />;
    if (loading) return <h1>Loading...</h1>;

    console.log('host', gameData.hostId);
    console.log('userId', userId);
    return (
        <>
            <h1>Lobby</h1>
            {username ? null : <UsernameForm />}
            <UsersList />
            <Chat />
            {gameData.hostId === userId ? <Settings /> : null}
        </>
    );
};

export default Lobby;
