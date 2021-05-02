import { combineReducers } from 'redux';
import { GameData } from '../../util/types';
import { Actions } from '../actions';

const initialGameData: GameData = {
    hostId: '',
    gameOn: false,
    users: {},
    deck: [],
    settings: {
        lives: 3,
        jokers: false,
        bus: true,
    },
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

const userId = (state: string | null = null, action: Actions) => {
    switch (action.type) {
        case 'SET_USERID':
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

const notFound = (state: boolean = false, action: Actions) => {
    switch (action.type) {
        case 'SET_NOTFOUND':
            return action.payload;
        default:
            return state;
    }
};

export type AllState = {
    gameData: GameData;
    lobbyId: string | null;
    userId: string | null;
    username: string | null;
    notFound: boolean;
};

const appReducer = combineReducers({
    gameData,
    lobbyId,
    userId,
    username,
    notFound,
});

export default appReducer;
