import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    children: string;
    ta?: 'center' | 'left' | 'right';
    color: string;
}

const Heading = ({ variant, children, ta, color }: Props) => {
    let title;
    switch (variant) {
        case 'h2':
            title = (
                <H2 ta={ta} color={color}>
                    {children}
                </H2>
            );
            break;
        case 'h3':
            title = (
                <H3 ta={ta} color={color}>
                    {children}
                </H3>
            );
            break;
        case 'h4':
            title = (
                <H4 ta={ta} color={color}>
                    {children}
                </H4>
            );
            break;
        case 'h5':
            title = (
                <H5 ta={ta} color={color}>
                    {children}
                </H5>
            );
            break;
        default:
            title = (
                <H1 ta={ta} color={color}>
                    {children}
                </H1>
            );
            break;
    }
    return <>{title}</>;
};

export default Heading;

interface HeadingProps {
    ta?: 'center' | 'left' | 'right';
    c?: string;
}

const H1 = styled.h1<HeadingProps>`
    text-align: ${({ ta }) => (ta ? ta : 'center')};
    color: ${({ color }) => (color ? color : 'black')};
`;

const H2 = styled.h2<HeadingProps>`
    text-align: ${({ ta }) => (ta ? ta : 'center')};
    color: ${({ color }) => (color ? color : 'black')};
`;

const H3 = styled.h3<HeadingProps>`
    text-align: ${({ ta }) => (ta ? ta : 'center')};
    color: ${({ color }) => (color ? color : 'black')};
`;

const H4 = styled.h4<HeadingProps>`
    text-align: ${({ ta }) => (ta ? ta : 'center')};
    color: ${({ color }) => (color ? color : 'black')};
`;

const H5 = styled.h5<HeadingProps>`
    text-align: ${({ ta }) => (ta ? ta : 'center')};
    color: ${({ color }) => (color ? color : 'black')};
`;
