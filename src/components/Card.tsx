import React from 'react';
import styled from 'styled-components';
import { Card } from '../util/types';

interface Props {
    val: Card | 'back';
    size?: 'small' | 'large' | 'xlarge';
}

const CardEl = ({ val, size }: Props) => {
    return (
        <Front className={`card shadow no-border ${size ? size : ''} ${val}`} />
    );
};

export default CardEl;

const Front = styled.div``;
