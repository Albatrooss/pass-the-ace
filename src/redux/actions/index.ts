import { Dispatch } from 'redux';
import { GameData } from '../../util/types';

type GameDataActionType = 'SET_GAMEDATA';
type LobbyIdActionType = 'SET_LOBBYID';
type UsernameActionType = 'SET_USERNAME';

export type Actions =
    | { type: GameDataActionType; payload?: GameData }
    | { type: LobbyIdActionType; payload?: string | null }
    | { type: UsernameActionType; payload?: string | null };

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

export const setUsername = (username: string | null, dispatch: Dispatch) => {
    console.log('setting username', username);
    dispatch({
        type: 'SET_USERNAME',
        payload: username,
    });
};
