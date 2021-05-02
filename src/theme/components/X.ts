import styled from 'styled-components';

interface XProps {
    size?: 'sm' | 'lg';
    ml?: string;
}

export default styled.div<XProps>`
    background-color: red;
    width: ${({ size }) => {
        switch (size) {
            case 'lg':
                return '2rem';
            default:
                return '1rem';
        }
    }};
    margin-left: ${({ ml }) => (ml ? ml : 0)};
    border-radius: ${({ theme }) => theme.borderRadius};
    position: relative;
    cursor: pointer;

    &::after,
    &::before {
        content: '';
        width: 100%;
        height: 2px;
        background-color: ${({ theme }) => theme.color.white};
        position: absolute;
        top: 50%;
        margin-top: -1px;
        transform: rotate(45deg);
        transition: all 200ms ease;
    }
    &::before {
        transform: rotate(-45deg);
    }

    &:hover {
        border: 2px solid red;
        background-color: ${({ theme }) => theme.color.white};

        &::before,
        &::after {
            background-color: red;
        }
    }
`;
