import React from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { theme } from '../../theme';

interface Props {
    size?: 'sm' | 'md' | 'lg';
    name: string;
    value: boolean;
    onClick: (name: string, value: boolean) => void;
}

const CheckBox = ({ size, name, value, onClick }: Props) => {
    let s;
    switch (size) {
        case 'sm':
            s = '0.5rem';
            break;
        case 'lg':
            s = '1.5rem';
            break;
        default:
            s = '1rem';
    }
    console.log('val?', value);
    return (
        <Check onClick={() => onClick(name, !value)}>
            {value ? (
                <FaCheck color={theme.color.primary} size={s} />
            ) : (
                <FaCheck color={theme.color.white} size={s} />
            )}
        </Check>
    );
};

export default CheckBox;

const Check = styled.div`
    border: 2px solid ${({ theme }) => theme.color.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 2px;
    display: flex;
    cursor: pointer;
`;
