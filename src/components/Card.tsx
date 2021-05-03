import React from 'react';
import styled from 'styled-components';
import { Card } from '../util/types';

interface Props {
    val: Card;
}

const CardEl = ({ val }: Props) => {
    return (
        <Flipper>
            <FlipperWrapper>
                <Back className={`card shadow no-border xlarge back`} />
                <Front className={`card shadow no-border xlarge ${val}`} />
            </FlipperWrapper>
        </Flipper>
    );
};

export default CardEl;

const FlipperWrapper = styled.div`
    transform-style: preserve-3d;
    position: relative;
    width: 11rem;
    transition: all 350ms cubic-bezier(1, 0.4, 0.4, 1);
`;
const Flipper = styled.div`
    &:hover ${FlipperWrapper} {
        transform: rotateY(180deg);
    }
`;
const Back = styled.div`
    position: absolute;
    backface-visibility: hidden;
`;
const Front = styled(Back)`
    transform: rotateY(180deg);
`;
