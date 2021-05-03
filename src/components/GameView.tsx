import React from 'react';
import { useSelector } from 'react-redux';
import { AllState } from '../redux/reducers';
import Error from '../theme/components/Error';
import { GameData } from '../util/types';
import CardEl from './Card';
import Heading from './Heading';
import Layout from './Layout';

interface Props {
    gameData: GameData;
}

const GameView = ({ gameData }: Props) => {
    const { users, dealer } = gameData;
    const userId = useSelector<AllState, AllState['userId']>(
        state => state.userId,
    );
    if (!userId) return <Error>Ruh Roh no userID</Error>;
    const user = users[userId];
    return <Layout>{user.card ? <CardEl val={user.card} /> : null}</Layout>;
};

export default GameView;
