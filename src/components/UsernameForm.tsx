import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { joinLobby } from '../hooks/useSocket';
import { setUsername } from '../redux/actions';

interface Props {}

const UsernameForm = ({}: Props) => {
    const dispatch = useDispatch();
    const [uname, setUname] = useState<string>('');

    const register = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(uname, dispatch);
        joinLobby(uname);
    };
    return (
        <Form onSubmit={register}>
            <Input
                type='text'
                name='username'
                placeholder='Username'
                value={uname}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUname(e.target.value)
                }
            />
            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default UsernameForm;

const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
