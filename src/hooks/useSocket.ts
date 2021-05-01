import io from 'socket.io-client';
import { GameData, MessageGrp, User } from '../util/types';

let socket: SocketIOClient.Socket;

type NotFoundCB = (err: boolean) => void;

export const initiateSocket = (
    lobbyId: string,
    username: string | null,
    cb: NotFoundCB,
) => {
    socket = io('http://localhost:5000');
    console.log('Connecting to socket...');
    if (socket && lobbyId)
        socket.emit('firstJoin', {
            lobbyId,
            username,
        });
    socket.on('lobbyNotFound', () => {
        console.log('lbby not found');
        cb(true);
    });
};

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
};

export type GameCB = (err: string | null, gameData: GameData) => void;
export const subscribeToGame = (cb: GameCB) => {
    if (!socket) return true;

    socket.on('gameUpdate', (gameData: GameData) => {
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
    if (socket) socket.emit('joinLobby', username);
};

export const sendMessage = (text: string) => {
    if (socket) socket.emit('chat', text);
};
