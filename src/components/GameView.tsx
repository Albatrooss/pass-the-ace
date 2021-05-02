import React from 'react';
import { GameData } from '../util/types';
import Heading from './Heading';

interface Props {
    gameData: GameData;
}

const GameView = ({ gameData }: Props) => {
    return <Heading>This is the game</Heading>;
};

export default GameView;
