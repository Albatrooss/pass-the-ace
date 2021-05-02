import React, { ReactChildren, ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    h?: string;
    children: React.ReactNode;
}

const Layout = ({ h, children }: Props) => {
    return <Wrapper h={h}>{children}</Wrapper>;
};

export default Layout;

interface WrapperProps {
    h: string | undefined;
}
const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    min-height: ${({ h }) => (h ? h : '100vh')};
    padding: ${({ theme }) => theme.spacing.md};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
