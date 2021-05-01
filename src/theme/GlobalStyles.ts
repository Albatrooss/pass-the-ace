import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        background-color: ${({ theme }) => theme.color.white};
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, h6,
    a, p, div {
        font-family: Arial, Helvetica, sans-serif;
    }
`;

export default GlobalStyle;
