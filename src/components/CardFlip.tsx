import React from 'react';
import styled from 'styled-components';
import { Card } from '../util/types';

interface Props {
    val: Card;
    showing?: boolean;
}

const CardEl = ({ val, showing }: Props) => {
    return (
        <Flipper showing={showing}>
            <FlipperWrapper showing={showing}>
                <Back className={`card shadow no-border xlarge back`} />
                <Front className={`card shadow no-border xlarge ${val}`} />
            </FlipperWrapper>
        </Flipper>
    );
};

export default CardEl;

interface FlipperProps {
    showing?: boolean;
}
const FlipperWrapper = styled.div<FlipperProps>`
    transform-style: preserve-3d;
    position: relative;
    width: 11rem;
    transform: rotateY(${({ showing }) => (showing ? '0' : '180')}deg);
    transition: all 350ms cubic-bezier(1, 0.4, 0.4, 1);
`;
const Flipper = styled.div<FlipperProps>`
    &:hover ${FlipperWrapper} {
        transform: rotateY(${({ showing }) => (showing ? '180' : '0')}deg);
    }
`;
const Back = styled.div`
    position: absolute;
    backface-visibility: hidden;
`;
const Front = styled(Back)`
    transform: rotateY(180deg);
`;
