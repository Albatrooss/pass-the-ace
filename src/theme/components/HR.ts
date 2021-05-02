import styled from 'styled-components';

interface Props {
    color?: string;
}
export default styled.div<Props>`
    width: 100%;
    height: 2px;
    background-color: ${({ color }) => (color ? color : '#333')};
    margin: ${({ theme }) => theme.spacing.sm} 0;
`;
