import { combineReducers } from 'redux';
import { GameData } from '../../util/types';
import { Actions } from '../actions';

const initialGameData: GameData = {
    hostId: '',
    gameOn: false,
    users: [],
    deck: [],
};

const gameData = (state: GameData = initialGameData, action: Actions) => {
    switch (action.type) {
        case 'SET_GAMEDATA':
            return action.payload;
        default:
            return state;
    }
};

const lobbyId = (state: string | null = null, action: Actions) => {
    switch (action.type) {
        case 'SET_LOBBYID':
            return action.payload;
        default:
            return state;
    }
};

const username = (state: string | null = null, action: Actions) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return action.payload;
        default:
            return state;
    }
};

export type AllState = {
    gameData: GameData;
    lobbyId: string | null;
    username: string | null;
};

const appReducer = combineReducers({
    gameData,
    lobbyId,
    username,
});

export default appReducer;
