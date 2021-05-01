import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import UsernameForm from '../components/UsernameForm';
import UsersList from '../components/UsersList';
import {
    disconnectSocket,
    initiateSocket,
    subscribeToGame,
} from '../hooks/useSocket';
import { setGameData, setLobbyId, setUsername } from '../redux/actions';
import { AllState } from '../redux/reducers';

interface Props {}

const Lobby = ({}: Props) => {
    const { lobbyId } = useParams<{ lobbyId: string }>();

    const dispatch = useDispatch();
    const username = useSelector<AllState, AllState['username']>(
        state => state.username,
    );

    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        if (lobbyId) {
            initiateSocket(lobbyId, username, err => {
                console.log('errr!>?', err);
                if (err) setNotFound(true);
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

    if (notFound) return <Redirect to='/notfound' />;
    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            <h1>Lobby</h1>
            {username ? null : <UsernameForm />}
            <UsersList />
            <Chat />
        </>
    );
};

export default Lobby;
