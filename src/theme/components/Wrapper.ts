import styled, { css } from 'styled-components';

interface WrapperProps {
    maxW?: 'sm' | 'md' | 'lg';
    w?: 'sm' | 'md' | 'lg';
    mx?: string;
    my?: string;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
    flex?: number;
}

export const Wrapper = styled.div<WrapperProps>`
    ${({ flex }) => (flex ? `flex: ${flex}` : '')};
    width: ${({ w }) => {
        switch (w) {
            case 'sm':
                return '20rem';
            case 'md':
                return '30rem';
            case 'lg':
                return '40rem';
            default:
                return '100%';
        }
    }};
    max-width: ${({ maxW }) => {
        switch (maxW) {
            case 'sm':
                return '20rem';
            case 'md':
                return '30rem';
            case 'lg':
                return '40rem';
            default:
                return '100%';
        }
    }};
    ${({ mx }) =>
        mx
            ? css`
                  margin-left: ${mx};
                  margin-right: ${mx};
              `
            : null}
    ${({ my }) =>
        my
            ? css`
                  margin-top: ${my};
                  margin-bottom: ${my};
              `
            : null}
    ${({ mt }) =>
        mt
            ? css`
                  margin-top: ${mt};
              `
            : null}
    ${({ mb }) =>
        mb
            ? css`
                  margin-bottom: ${mb};
              `
            : null}
    ${({ ml }) =>
        ml
            ? css`
                  margin-left: ${ml};
              `
            : null}
    ${({ mr }) =>
        mr
            ? css`
                  margin-right: ${mr};
              `
            : null}
`;
