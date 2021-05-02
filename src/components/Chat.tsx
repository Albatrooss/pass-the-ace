import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import {
    disconnectSocket,
    sendMessage,
    subscribeToChat,
} from '../hooks/useSocket';
import { AllState } from '../redux/reducers';
import { Wrapper } from '../theme/components/Wrapper';
import { MessageGrp } from '../util/types';
import ChatBubble from './ChatBubble';

interface Props {}

const Chat = ({}: Props) => {
    const username = useSelector<AllState, AllState['username']>(
        state => state.username,
    );
    const lobbyId = useSelector<AllState, AllState['lobbyId']>(
        state => state.lobbyId,
    );

    const [messages, setMessages] = useState<MessageGrp[]>([]);
    const [text, setText] = useState<string>('');

    const sendChat = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('chat?', username);
        if (!username) return;
        sendMessage(text);
        setText('');
    };

    useEffect(() => {
        console.log('chat effect');
        subscribeToChat((err: string | null, msgs: MessageGrp[]) => {
            if (err) return; //TODO
            console.log('chat receieved', msgs);
            setMessages(msgs);
        });
        return () => disconnectSocket();
    }, [lobbyId]);

    console.log('username: ', username);
    return (
        <Wrapper w='md' my='1rem'>
            <Box>
                <MessageArea>
                    {messages.map((m: MessageGrp, i) => (
                        <ChatBubble key={i} message={m} />
                    ))}
                </MessageArea>
                <Form onSubmit={sendChat}>
                    <Input
                        type='text'
                        name='message'
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <Button type='submit'>Send</Button>
                </Form>
            </Box>
        </Wrapper>
    );
};

export default Chat;

const Box = styled.div`
    height: 20rem;
    border: 2px solid ${({ theme }) => theme.color.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    flex-direction: column;
`;

const MessageArea = styled.div`
    flex: 1;
    padding: 1rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.color.white};
    }

    &::-webkit-scrollbar-thumb {
        background: #aaa;
    }
`;

const Form = styled.form`
    display: flex;
`;

const Input = styled.input`
    flex: 1;
    ${({ theme }) => css`
        margin: ${theme.spacing.sm};
        margin-right: 0;
        padding: ${theme.spacing.sm};
        font-size: 1rem;
        background-color: ${theme.color.white};
        border: 2px solid ${theme.color.primary};
        border-radius: ${({ theme }) =>
            `${theme.borderRadius}  0 0 ${theme.borderRadius}`};
    `}

    &:focus,
    &:target,
    &:active {
        border: 2px solid ${({ theme }) => theme.color.secondary};
        outline: none;
        background-color: white;
    }
`;

const Button = styled.button`
    display: block;
    margin: ${({ theme }) => theme.spacing.sm};
    margin-left: 0;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: 1rem;
    border-radius: 0
        ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius}`} 0;
    border: none;
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.color.primaryDark};
    }

    ${Input}:focus ~ &,
    ${Input}:active ~ &,
    ${Input}:target ~ & {
        background-color: ${({ theme }) => theme.color.secondary};

        &:hover {
            background-color: ${({ theme }) => theme.color.secondaryDark};
        }
    }
`;
