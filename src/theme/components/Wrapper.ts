import styled, { css } from 'styled-components';

interface WrapperProps {
    w?: 'sm' | 'md' | 'lg';
    mx?: string;
    my?: string;
    mt?: string;
    mb?: string;
    ml?: string;
    mr?: string;
}

export const Wrapper = styled.div<WrapperProps>`
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
