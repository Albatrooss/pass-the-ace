import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
    disconnectSocket,
    sendMessage,
    subscribeToChat,
} from '../hooks/useSocket';
import { AllState } from '../redux/reducers';
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
        <Wrapper>
            <MessageArea>
                {messages.map((m: MessageGrp, i) => (
                    <ChatBubble key={i} message={m} />
                ))}
            </MessageArea>
            <Form onSubmit={sendChat}>
                <input
                    type='text'
                    name='message'
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button type='submit'>Send</button>
            </Form>
        </Wrapper>
    );
};

export default Chat;

const Wrapper = styled.div`
    width: 40rem;
    height: 20rem;
    border: 2px solid darkblue;
    display: flex;
    flex-direction: column;
`;

const MessageArea = styled.div`
    flex: 1;
    padding: 1rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
`;

const Form = styled.form``;
