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
            <Bubble me={username === message.username}>
                <Title>{message.username.toUpperCase()}</Title>
                {message.messages.map((text, i) => (
                    <Text key={i}>{text}</Text>
                ))}
            </Bubble>
        </div>
    );
};

export default ChatBubble;

interface BubbleProps {
    me?: boolean;
}

const Bubble = styled.div<BubbleProps>`
    background-color: ${({ me }) => (me ? 'lightblue' : 'grey')};
    width: 66%;
    margin-left: ${({ me }) => (me ? 'auto' : 0)};
    border-radius: 1rem;
    padding: 4px 8px;
    margin-top: 1rem;
`;

const Title = styled.p`
    font-weight: bold;
`;

const Text = styled.p``;
