import styled from 'styled-components';

export default styled.p`
    color: ${({ theme }) => theme.color.error};
    padding: ${({ theme }) => theme.spacing.sm};
`;
