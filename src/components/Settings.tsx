import React from 'react';
import { Wrapper } from '../theme/components/Wrapper';
import Heading from './Heading';

interface Props {}

const Settings = ({}: Props) => {
    return (
        <Wrapper>
            <Heading variant='h3'>Settings</Heading>
        </Wrapper>
    );
};

export default Settings;
