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

    console.log('host', gameData.hostId);
    console.log('userId', userId);
    return (
        <>
            <Heading>{`Lobby ${lobbyId.toUpperCase()}`}</Heading>
            {username ? null : <UsernameForm />}
            <UsersList />
            <Chat />
            {gameData.hostId === userId ? <Settings /> : null}
        </>
    );
};

export default Lobby;
