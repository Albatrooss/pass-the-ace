import { Dispatch } from 'redux';
import { GameData } from '../../util/types';

type GameDataActionType = 'SET_GAMEDATA';
type LobbyIdActionType = 'SET_LOBBYID';
type UserIdActionType = 'SET_USERID';
type UsernameActionType = 'SET_USERNAME';
type NotFoundActionType = 'SET_NOTFOUND';

export type Actions =
    | { type: GameDataActionType; payload?: GameData }
    | { type: LobbyIdActionType; payload?: string | null }
    | { type: UserIdActionType; payload?: string }
    | { type: UsernameActionType; payload?: string | null }
    | { type: NotFoundActionType; payload?: boolean };

export const setGameData = (gameData: GameData, dispatch: Dispatch) => {
    dispatch({
        type: 'SET_GAMEDATA',
        payload: gameData,
    });
};

export const setLobbyId = (lobbyId: string | null, dispatch: Dispatch) => {
    dispatch({
        type: 'SET_LOBBYID',
        payload: lobbyId,
    });
};

export const setUserId = (id: string, dispatch: Dispatch) => {
    dispatch({
        type: 'SET_USERID',
        payload: id,
    });
};

export const setUsername = (
    username: string | null,
    dispatch: Dispatch<any>,
) => {
    dispatch({
        type: 'SET_USERNAME',
        payload: username,
    });
};

export const setNotFound = (notFound: boolean, dispatch: Dispatch) => {
    dispatch({
        type: 'SET_NOTFOUND',
        payload: notFound,
    });
};
