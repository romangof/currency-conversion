import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Grid, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import CurrencyCard from './components/CurrencyCard';

import './App.css';

export const defaultCurrencies = ['EUR', 'USD', 'GBP'];
export const API = 'https://api.exchangeratesapi.io/latest';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { main: '#FAAB1A' },
    },
    typography: {
        fontFamily: [
            'Roboto',
            'Arial',
            'sans-serif'
        ].join(','),
    }
});

export async function fetchData(target, base = 'EUR') {
    target = target.filter(currency => currency !== base);

    let query = `?symbols=${target.join()}`;

    if (base !== 'EUR') {
        query += `&base=${base}`;
    }

    const request = await axios.get(API + query);
    const data = request.data;

    return { [base]: data.rates };
}

export default function App() {
    const [rates, setRates] = useState({ EUR: {}, USD: {}, GBP: {} });
    const [selected, setSelected] = useState({ origin: 'EUR', target: 'USD', value: 0 });

    useEffect(() => {
        async function getRate() {
            const rateData = await fetchData(defaultCurrencies, selected.origin);

            setRates(prevState => ({ ...prevState, ...rateData }));
        }

        if (!Object.keys(rates[selected.origin]).length) {
            getRate();
        }
        
    }, [selected.origin]);

    const handleInputChange = event => {
        setSelected({...selected, value: parseInt(event.target.value)});
    };

    const handleTabChange = (source, value) => {
        setSelected({...selected, [source]: value});
    };

    return (
        <ThemeProvider theme={theme}>
            <Container className="App" maxWidth={false}>
                <Grid container className="Grid" justify="space-around" alignItems="flex-start" spacing={4}>
                    <Grid item xs={12} className="title">
                        <h1>Currency Conversion</h1>
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <CurrencyCard selected={selected} rates={rates} onChange={handleInputChange} tabChange={handleTabChange} />
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <CurrencyCard selected={selected} rates={rates} readOnly={true} tabChange={handleTabChange} />
                    </Grid>
                </Grid>
            </Container>

            <CssBaseline />
        </ThemeProvider>
    );
}