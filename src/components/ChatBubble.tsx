import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AllState } from '../redux/reducers';
import { MessageGrp } from '../util/types';

interface Props {
    message: MessageGrp;
}

const ChatBubble = ({ message }: Props) => {
    const username = useSelector<AllState, AllState['username']>(
        state => state.username,
    );

    return (
        <div>
            <Bubble
                me={username === message.username}
                bot={message.username === ''}
            >
                {message.username !== username ? (
                    <Title>{message.username.toUpperCase()}</Title>
                ) : null}
                {message.messages.map((text, i) => (
                    <Text key={i}>{text}</Text>
                ))}
            </Bubble>
        </div>
    );
};

export default ChatBubble;

interface BubbleProps {
    me: boolean;
    bot: boolean;
}

const Bubble = styled.div<BubbleProps>`
    background-color: ${({ me, bot }) =>
        bot ? 'none' : me ? 'lightblue' : 'lightgrey'};
    width: ${({ bot }) => (bot ? '90%' : '66%')};
    margin-left: ${({ me, bot }) => (me || bot ? 'auto' : 0)};
    margin-right: ${({ bot }) => (bot ? 'auto' : 0)};
    border-radius: ${({ theme, bot }) => (bot ? theme.borderRadius : '1rem')};
    padding: 1rem 2rem;
    margin-top: 1rem;
    /* text-align: ${({ bot }) => (bot ? 'center' : 'left')}; */
`;

const Title = styled.p`
    font-weight: bold;
`;

const Text = styled.p``;
