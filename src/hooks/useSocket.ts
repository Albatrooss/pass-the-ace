import { Dispatch } from 'redux';
import io from 'socket.io-client';
import { setUserId } from '../redux/actions';
import { GameData, MessageGrp } from '../util/types';
import { SOCKET_URL } from '../util/constants';

let socket: SocketIOClient.Socket;

type InitiateCB = (err: string) => void;

export const initiateSocket = (
    lobbyId: string,
    username: string | null,
    dispatch: Dispatch,
    cb: InitiateCB,
) => {
    socket = io(SOCKET_URL);
    console.log('Connecting to socket...');
    socket.on('connect', () => {
        console.log('userId', socket.id);
        setUserId(socket.id, dispatch);
    });
    if (socket && lobbyId)
        socket.emit('firstJoin', {
            lobbyId,
            username,
        });
    socket.on('lobbyNotFound', () => {
        console.log('lbby not found');
        cb('Lobby Not Found');
    });
};

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
};

export type GameCB = (err: string | null, gameData?: GameData) => void;
export const subscribeToGame = (cb: GameCB) => {
    if (!socket) return cb('Server Error');

    socket.on('game', (gameData: GameData) => {
        console.log('game update');
        return cb(null, gameData);
    });
};

export type ChatCB = (err: string | null, msgs: MessageGrp[]) => void;
export const subscribeToChat = (cb: ChatCB) => {
    if (!socket) return true;

    socket.emit('getChat');

    socket.on('chat', (msgs: MessageGrp[]) => {
        return cb(null, msgs);
    });
};

export const joinLobby = (username: string) => {
    if (socket) socket.emit('joinLobby', username.toLowerCase());
};

export const sendLeaveLobby = () => {
    if (socket) socket.emit('leaveLobby');
};

export const sendMessage = (text: string) => {
    if (socket) socket.emit('chat', text);
};

export const sendStartGame = () => {
    if (socket) socket.emit('startGame');
};
