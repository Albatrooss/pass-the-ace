import { SettingsType } from '../util/types';
import React, { FormEvent, useState } from 'react';
import { Wrapper } from '../theme/components/Wrapper';
import Heading from './Heading';
import CheckBox from './forms/CheckBox';
import NumberSel from './forms/NumberSel';
import styled, { css } from 'styled-components';
import { sendStartGame } from '../hooks/useSocket';

interface Props {}

const Settings = ({}: Props) => {
    const [settings, setSettings] = useState<SettingsType>({
        lives: 3,
        jokers: false,
        bus: true,
    });

    const handleNum = (name: string, value: number) => {
        setSettings(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheck = (name: string, value: boolean) => {
        console.log('checking', name, value);
        setSettings(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const startGame = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendStartGame();
    };

    return (
        <Wrapper w='md'>
            <Box>
                <Heading variant='h3'>Settings</Heading>
                <Form onClick={startGame}>
                    <Row>
                        <Label>Lives</Label>
                        <ChoiceWrapper>
                            <NumberSel
                                name='lives'
                                value={settings.lives}
                                onClick={handleNum}
                            />
                        </ChoiceWrapper>
                    </Row>
                    <Row>
                        <Label>Jokers</Label>
                        <ChoiceWrapper>
                            <CheckBox
                                name='jokers'
                                value={settings.jokers}
                                onClick={handleCheck}
                            />
                        </ChoiceWrapper>
                    </Row>
                    <Row>
                        <Label>Bus</Label>
                        <ChoiceWrapper>
                            <CheckBox
                                name='bus'
                                value={settings.bus}
                                onClick={handleCheck}
                            />
                        </ChoiceWrapper>
                    </Row>
                    <Button type='submit'>Start Game</Button>
                </Form>
            </Box>
        </Wrapper>
    );
};

export default Settings;

const Box = styled.div`
    border: 2px solid ${({ theme }) => theme.color.primary};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

const Form = styled.form``;

const Row = styled.div`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm} 0;
`;

const Label = styled.p`
    flex: 3;
`;

const ChoiceWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    display: block;
    margin: 0 auto;
    cursor: pointer;
    ${({ theme }) => css`
        border: 2px solid ${theme.color.primary};
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
        font-size: 1rem;
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        border-radius: ${theme.borderRadius};
    `}
    transition: all 200ms ease;

    &:hover {
        ${({ theme }) => css`
            background-color: ${theme.color.white};
            color: ${theme.color.primary};
        `}
    }
`;
