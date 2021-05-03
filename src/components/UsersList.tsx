import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendLeaveLobby } from '../hooks/useSocket';
import { setUsername } from '../redux/actions';
import { AllState } from '../redux/reducers';
import { Wrapper } from '../theme/components/Wrapper';
import X from '../theme/components/X';
import { properNoun } from '../util/helpers';
import { User } from '../util/types';
import Heading from './Heading';

interface Props {
    flex?: number;
}

const UsersList = ({ flex }: Props) => {
    const { users, hostId } = useSelector<AllState, AllState['gameData']>(
        state => state.gameData,
    );

    const userId = useSelector<AllState, AllState['userId']>(
        state => state.userId,
    );
    const dispatch = useDispatch();

    const leaveLobby = () => {
        setUsername(null, dispatch);
        sendLeaveLobby();
    };

    return (
        <Wrapper maxW='lg' my='1rem' flex={flex}>
            <Box>
                <Heading variant='h3'>The Players</Heading>
                {Object.values(users).map((u: User, i) => (
                    <UserWrapper key={i} odd={i % 2}>
                        <Username>
                            {properNoun(u.username)}
                            {u.id === hostId ? ' (HOST)' : null}
                        </Username>
                        {u.id === userId ? (
                            <X ml='auto' onClick={leaveLobby} />
                        ) : null}
                    </UserWrapper>
                ))}
            </Box>
        </Wrapper>
    );
};

export default UsersList;

const Box = styled.div`
    height: 100%;
    border: 2px solid ${({ theme }) => theme.color.primary};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

interface UserWrapperProps {
    odd: number;
}
const UserWrapper = styled.div<UserWrapperProps>`
    display: flex;
    background-color: ${({ odd, theme }) =>
        odd ? theme.color.lighterGrey : theme.color.white};
    padding: ${({ theme }) => theme.spacing.sm};
`;

const Username = styled.p`
    font-weight: bold;
`;
