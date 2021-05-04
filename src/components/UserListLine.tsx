import React from 'react';
import { FaBus, FaHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { theme } from '../theme';
import X from '../theme/components/X';
import { properNoun } from '../util/helpers';
import { User } from '../util/types';

interface Props {
    user: User;
    odd: number;
    host: boolean;
    me: boolean;
    leaveLobby: () => void;
}

const UserListLine = ({ user, odd, host, me, leaveLobby }: Props) => {
    let lives = null;
    if (user.lives) {
        lives = [];
        for (let i = 0; i < user.lives; i++) {
            lives.push(
                <Heart>
                    <FaHeart color='red' />
                </Heart>,
            );
        }
    } else {
        lives = (
            <Heart bg={theme.color.black}>
                <FaBus color='yellow' />
            </Heart>
        );
    }
    return (
        <UserWrapper odd={odd}>
            <Username>
                {properNoun(user.username)}
                {host ? ' (HOST)' : null}
            </Username>
            {lives}
            {me ? <X ml='auto' onClick={leaveLobby} /> : null}
        </UserWrapper>
    );
};

export default UserListLine;

interface UserWrapperProps {
    odd: number;
}
const UserWrapper = styled.div<UserWrapperProps>`
    display: flex;
    align-items: center;
    background-color: ${({ odd, theme }) =>
        odd ? theme.color.lighterGrey : theme.color.white};
    padding: ${({ theme }) => theme.spacing.sm};
`;

const Username = styled.p`
    font-weight: bold;
`;

interface HeartProps {
    bg?: string;
}
const Heart = styled.div<HeartProps>`
    margin-left: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ bg }) => bg};
    /* border: 2px solid ${({ bg }) => (bg ? bg : 'none')}; */
`;
