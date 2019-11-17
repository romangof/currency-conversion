import axios from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import { Container, Grid, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import CurrencyCard from './components/CurrencyCard';

import './App.css';

const API = 'https://api.exchangeratesapi.io/latest';
const defaultCurrencies = ['EUR', 'USD', 'GBP'];

const theme = createMuiTheme({
    palette: {
        primary: { main: '#004E98', highlight: '#FF6700' },
        secondary: { main: '#FF6700' },
        background: { default: '#C0C0C0', light: '#E5E5E5' },
    }
});

async function fetchData(target, base = 'EUR', setRates) {
    target = target.filter(currency => currency !== base);

    let query = `?symbols=${target.join()}`;

    if (base !== 'EUR') {
        query += `&base=${base}`;
    }

    const request = await axios(API + query);
    const data = request.data;

    setRates(prevRates => ({ ...prevRates, [base]: data.rates }));
}

export default function App() {
    const [rates, setRates] = useState({ EUR: {}, USD: {}, GBP: {} });
    const [selected, setSelected] = useState({ origin: 'EUR', target: 'USD', value: 0 });

    useEffect(() => {
        defaultCurrencies.map(currency => fetchData(defaultCurrencies, currency, setRates));
    }, []);

    const handleInputChange = event => {
        setSelected({...selected, value: event.target.value});
    };

    const handleTabChange = (source, value) => {
        setSelected({...selected, [source]: value});
    };

    return (
        <ThemeProvider theme={theme}>
            <Container className="App" maxWidth={false}>
                <Grid container className="Grid" justify="space-around" alignItems="flex-start" spacing={4}>
                    <Grid item xs={12}>
                        <h1>Currency Conversion</h1>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CurrencyCard selected={selected} rates={rates} onChange={handleInputChange} tabChange={handleTabChange} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CurrencyCard selected={selected} rates={rates} readOnly={true} tabChange={handleTabChange} />
                    </Grid>
                </Grid>
            </Container>

            <CssBaseline />
        </ThemeProvider>
    );
}