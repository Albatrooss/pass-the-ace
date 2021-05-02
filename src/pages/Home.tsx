import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Layout from '../components/Layout';
import { setUsername } from '../redux/actions';
import Heading from '../components/Heading';
import { Wrapper } from '../theme/components/Wrapper';
import { theme } from '../theme';
import { AllState } from '../redux/reducers';
import NotFound from '../components/NotFound';
import { SOCKET_URL } from '../util/constants';

interface Props {}

const Home = ({}: Props) => {
    const dispatch = useDispatch();

    const [waitingForHeroku, setWaitingForHeroku] = useState<boolean>(true);
    const [lobbyState, setLobbyState] = useState<{
        lobbyName: string;
        username: string;
    }>({
        lobbyName: '',
        username: '',
    });

    const history = useHistory();
    const error = useSelector<AllState, AllState['error']>(
        state => state.error,
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLobbyState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { lobbyName, username } = lobbyState;
        let uname = username.toLowerCase();
        setUsername(uname, dispatch);
        history.push(`/${lobbyName}`);
    };

    const [retries, setRetries] = useState<number>(20);

    const pingServer = async () => {
        if (retries === 0) {
            return;
        }
        try {
            const response = await fetch(SOCKET_URL + 'ping');
            console.log('1', response);
            const resp = await response.json();
            console.log('2', resp);
            if (!resp.connected) {
                throw new Error('Not connected yet');
            }
        } catch (error) {
            console.log(error.message || error);
            await new Promise(res => setTimeout(res, 1000));
            setRetries(prev => prev - 1);
            return;
        }
        setWaitingForHeroku(false);
    };
    useEffect(() => {
        pingServer();
    }, [retries]);

    if (waitingForHeroku)
        return (
            <Layout>
                <Heading>Waiting for Server to Boot up...</Heading>
                <Heading variant='h4'>{retries.toString()}</Heading>
            </Layout>
        );

    return (
        <Layout>
            <Heading color={theme.color.secondaryDark}>Pass The Ace</Heading>
            <Wrapper w='lg' mx='auto'>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        name='lobbyName'
                        placeholder='Lobby Name'
                        value={lobbyState.lobbyName}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <Input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={lobbyState.username}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <SubmitBtn type='submit'>Create Room</SubmitBtn>
                </Form>
            </Wrapper>
            {error ? <NotFound error={error} /> : null}
        </Layout>
    );
};

export default Home;

const Form = styled.form`
    width: 100%;
    padding: 1rem;
    ${({ theme }) => css`
        padding: ${theme.spacing.md};
        border: 2px solid ${theme.color.primary};
        border-radius: ${theme.borderRadius};
    `}
`;
const Input = styled.input`
    display: block;
    width: 100%;
    ${({ theme }) => css`
        padding: ${theme.spacing.sm};
        margin-top: ${theme.spacing.md};
        border: ${theme.color.primary} 2px solid;
        border-radius: ${theme.borderRadius};
    `}
    &::placeholder {
        color: #777;
    }
`;
const SubmitBtn = styled.button`
    display: block;
    ${({ theme }) => css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        margin: ${theme.spacing.md} auto 0 auto;
        border: none;
        border-radius: ${theme.borderRadius};
        background-color: ${theme.color.secondary};
        color: ${theme.color.white};

        &:hover {
            background-color: ${theme.color.secondaryDark};
        }
    `}
`;
