import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendLeaveLobby } from '../hooks/useSocket';
import { setUsername } from '../redux/actions';
import { AllState } from '../redux/reducers';
import { Wrapper } from '../theme/components/Wrapper';
import { User } from '../util/types';
import Heading from './Heading';
import UserListLine from './UserListLine';

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
        localStorage.removeItem('username');
        sendLeaveLobby();
    };

    return (
        <Wrapper maxW='lg' my='1rem' flex={flex}>
            <Box>
                <Heading variant='h3'>The Players</Heading>
                {Object.values(users).map((u: User, i) => (
                    <UserListLine
                        key={i}
                        user={u}
                        odd={i % 2}
                        me={u.id === userId}
                        host={hostId === u.id}
                        leaveLobby={leaveLobby}
                    />
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
