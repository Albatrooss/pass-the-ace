import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { setError } from '../redux/actions';

interface Props {
    error: string | null;
}

const NotFound = ({ error }: Props) => {
    const dispatch = useDispatch();
    const dismiss = () => {
        setError(null, dispatch);
    };
    return (
        <Wrapper onClick={dismiss}>
            <Box>
                <Text>{error}</Text>
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
