import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { setNotFound } from '../redux/actions';

interface Props {}

const NotFound = ({}: Props) => {
    const dispatch = useDispatch();
    const dismiss = () => {
        setNotFound(false, dispatch);
    };
    return (
        <Wrapper>
            <Box onClick={dismiss}>
                <Text>Lobby Not Found</Text>
            </Box>
        </Wrapper>
    );
};

export default NotFound;

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
`;

const Box = styled.div`
    ${({ theme }) => css`
        margin: ${theme.spacing.lg} auto;
        background-color: ${theme.color.white};
        padding: ${theme.spacing.lg};
        width: 40%;
    `}
    cursor: pointer;
`;

const Text = styled.p`
    text-align: center;
`;
