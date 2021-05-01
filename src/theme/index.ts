import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: '3px';
        cardSize: {
            lg: string;
            md: string;
            sm: string;
        };
        color: {
            primary: string;
            secondary: string;
            secondaryDark: string;
            lightgreen: string;
            darkpink: string;
            lightpink: string;

            white: string;
            black: string;
            red: string;

            error: string;
            success: string;
        };
        fontSize: {
            lg: string;
            md: string;
            sm: string;
        };
        maxWidth: string;
        spacing: {
            sm: string;
            md: string;
            lg: string;
        };
    }
}

export const theme: DefaultTheme = {
    borderRadius: '3px',
    cardSize: {
        lg: '2rem',
        md: '1.6rem',
        sm: '.7rem',
    },
    color: {
        primary: '#08785A',
        secondary: '#375E9E',
        secondaryDark: '#2b4d83',
        lightgreen: '#428C78',
        darkpink: '#F0A1A0',
        lightpink: '#EFBBC6',

        white: '#F1F1F1',
        black: '#333333',
        red: '#E73838',

        error: '#DC3545',
        success: '#198754',
    },
    fontSize: {
        lg: '2rem',
        md: '1.6rem',
        sm: '1.2rem',
    },
    maxWidth: '1366px',
    spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
    },
};
