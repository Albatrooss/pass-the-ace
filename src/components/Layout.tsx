import React, { ReactChildren, ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return <Wrapper>{children}</Wrapper>;
};

export default Layout;

const Wrapper = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
    margin: 0 auto;
`;
