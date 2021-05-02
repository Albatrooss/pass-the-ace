import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface Props {
    name: string;
    value: number;
    onClick: (name: string, value: number) => void;
}

const NumberSel = ({ name, value, onClick }: Props) => {
    return (
        <>
            <Btn onClick={() => onClick(name, value - 1)}>-</Btn>
            <Num>{value}</Num>
            <Btn onClick={() => onClick(name, value + 1)}>+</Btn>
        </>
    );
};

export default NumberSel;

const Btn = styled.div`
    ${({ theme }) => css`
        border: 2px solid ${theme.color.primary};
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
        border-radius: ${theme.borderRadius};
    `}
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 200ms ease;
    cursor: pointer;
    user-select: none;

    &:hover {
        ${({ theme }) => css`
            background-color: ${theme.color.white};
            color: ${theme.color.primary};
        `}
    }
`;

const Num = styled.div`
    font-size: 1.5rem;
    padding: ${({ theme }) => theme.spacing.sm};
`;
