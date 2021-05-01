import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AllState } from '../redux/reducers';
import { User } from '../util/types';

interface Props {}

const UsersList = ({}: Props) => {
    const { users, hostId } = useSelector<AllState, AllState['gameData']>(
        state => state.gameData,
    );

    return (
        <Wrapper>
            <h2>User List</h2>
            {users.map((u: User) => (
                <UserWrapper>
                    <Username>
                        {u.username}
                        {u.id === hostId ? '- HOST' : ''}
                    </Username>
                </UserWrapper>
            ))}
        </Wrapper>
    );
};

export default UsersList;

const Wrapper = styled.div`
    border: 2px solid darkblue;
`;
const UserWrapper = styled.div`
    display: flex;
`;

const Username = styled.p`
    font-weight: bold;
`;
