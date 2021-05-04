import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { joinLobby } from '../../hooks/useSocket';
import { setUsername } from '../../redux/actions';
import { AllState } from '../../redux/reducers';
import Error from '../../theme/components/Error';
import { Wrapper } from '../../theme/components/Wrapper';

const UsernameForm = () => {
    const { users } = useSelector<AllState, AllState['gameData']>(
        state => state.gameData,
    );
    const dispatch = useDispatch();
    const [uname, setUname] = useState<string>('');
    const [err, setErr] = useState<string>('');

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setUname(e.target.value);
        if (err) setErr('');
    };

    const register = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (uname.length < 3) return setErr('Name too short');
        if (uname.length > 10) return setErr('Name too long');
        if (Object.values(users).find(u => u.username === uname.toLowerCase()))
            return setErr('Username taken');
        setUsername(uname.toLowerCase(), dispatch);
        localStorage.setItem('username', uname);
        joinLobby(uname);
    };
    return (
        <Wrapper maxW='lg' my='1rem'>
            <Form onSubmit={register}>
                <Input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={uname}
                    onChange={handleName}
                    autoComplete='off'
                />
                <Button type='submit'>Submit</Button>
            </Form>
            <Error>{err}</Error>
        </Wrapper>
    );
};

export default UsernameForm;

const Form = styled.form`
    display: flex;
`;
const Input = styled.input`
    flex: 1;
    ${({ theme }) => css`
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
