import React from 'react';
import styled from 'styled-components';
import { Card } from '../util/types';

interface Props {
    val: Card;
}

const CardEl = ({ val }: Props) => {
    return <Front className={`card shadow no-border xlarge ${val}`} />;
};

export default CardEl;

const Front = styled.div``;
