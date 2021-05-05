import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { sendDeal, sendDecision } from '../hooks/useSocket';
import { AllState } from '../redux/reducers';
import Error from '../theme/components/Error';
import { Wrapper } from '../theme/components/Wrapper';
import { isKing, properNoun, splitUsers } from '../util/helpers';
import { Card, Decision, GameData } from '../util/types';
import CardEl from './Card';
import Heading from './Heading';

interface Props {
    gameData: GameData;
}

const GameView = ({ gameData }: Props) => {
    //STATE
    const [decision, setDecision] = useState<Decision>(null);
    const userId = useSelector<AllState, AllState['userId']>(
        state => state.userId,
    );

    const { users, turn } = gameData;
    const userIds = Object.keys(users);
    useEffect(() => {
        if (turn === 0) setDecision(null);
    }, [turn]);

    if (!userId) return <Error>Ruh Roh no userID</Error>;
    if (!userIds.length) return <Error>Ruh Roh something went wrong</Error>;

    console.log(
        'order:',
        gameData.order.map(i => gameData.users[i].username),
    );

    const dealer = gameData.order[gameData.order.length - 1];
    const turnId = gameData.order[turn];

    const user = users[userId];
    const { before, after } = splitUsers(gameData.order, userId);

    const makeDecision = (d: Decision) => {
        setDecision(d);
        sendDecision(d);
    };

    const deal = () => {
        sendDeal();
    };

    let decisionEl;
    if (decision) {
        decisionEl = <Heading variant='h4'>{decision}</Heading>;
    }

    return (
        <Wrapper w='lg'>
            <Box>
                <Row>
                    <Col col='l'>
                        {before.map((uId, i) => {
                            let card = users[uId].card;
                            let val: Card | null = null;
                            if (
                                turn >= userIds.length ||
                                (isKing(card) && turn >= i)
                            ) {
                                val = card;
                            }
                            const myTurn = turn === before.length - 1 - i;
                            return (
                                <div key={i}>
                                    <CardWrapper myTurn={myTurn}>
                                        <CardEl
                                            size='small'
                                            val={val || 'back'}
                                        />
                                        <Username>
                                            {gameData.users[uId].username}
                                        </Username>
                                    </CardWrapper>
                                </div>
                            );
                        })}
                    </Col>
                    <Col col='m'>
                        {user.card ? (
                            <CardEl size='xlarge' val={user.card} />
                        ) : null}
                    </Col>
                    <Col col='r'>
                        {after.map((uId, i) => {
                            let card = users[uId].card;
                            let val: Card | null = null;
                            if (
                                turn >= userIds.length ||
                                (isKing(card) && turn >= before.length + i + 1)
                            ) {
                                val = card;
                            }
                            return (
                                <div key={i}>
                                    <CardWrapper
                                        myTurn={turn === before.length + i + 1}
                                    >
                                        <CardEl
                                            size='small'
                                            val={val || 'back'}
                                        />
                                        <Username>
                                            {gameData.users[uId].username}
                                        </Username>
                                    </CardWrapper>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <BtnCol>
                        {decision ? (
                            <>{decisionEl}</>
                        ) : turnId === userId ? (
                            <>
                                <Button onClick={() => makeDecision('KEEP')}>
                                    Keep
                                </Button>
                                {dealer === userId ? (
                                    <Button onClick={() => makeDecision('CUT')}>
                                        CUT
                                    </Button>
                                ) : !isKing(user.card) ? (
                                    <Button
                                        onClick={() => makeDecision('PASS')}
                                    >
                                        Pass
                                    </Button>
                                ) : null}
                            </>
                        ) : (
                            <Text>
                                Waiting for {properNoun(users[turnId].username)}
                            </Text>
                        )}
                    </BtnCol>
                </Row>
                {gameData.order[userIds.length - 1] === userId ? (
                    <Button onClick={deal}>DEAL</Button>
                ) : null}
            </Box>
        </Wrapper>
    );
};

export default GameView;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
`;

interface ColProps {
    col: 'l' | 'm' | 'r';
}
const Col = styled.div<ColProps>`
    display: flex;
    ${({ col }) => (col === 'm' ? '' : 'flex: 1;')}
    flex-direction: ${({ col }) => (col === 'l' ? 'row-reverse' : 'row')};
`;

const Username = styled.p`
    text-align: center;
    text-transform: capitalize;
`;

const BtnCol = styled.div`
    margin: 0 auto;
`;

const Button = styled.button`
    ${({ theme }) => css`
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
        margin: ${theme.spacing.sm};
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        border: 2px solid ${theme.color.primary};
        border-radius: ${theme.borderRadius};
    `}

    cursor: pointer;
    transition: all 200ms ease;

    &:hover {
        ${({ theme }) => css`
            background-color: ${theme.color.white};
            color: ${theme.color.primary};
        `}
    }
`;

const Text = styled.p``;

interface CardWrapperProps {
    myTurn: boolean;
}
const CardWrapper = styled.div<CardWrapperProps>`
    ${({ myTurn, theme }) =>
        myTurn ? `border: 2px solid ${theme.color.secondary};` : ''}
    border-radius: ${({ theme }) => theme.borderRadius};
`;
