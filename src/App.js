import axios from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import { Container, Grid, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import CurrencyCard from './components/CurrencyCard';
import { addCurrencyRate } from './reducers';

import './App.css';

const API = 'https://api.exchangeratesapi.io/latest';
const defaultCurrencies = ['EUR', 'USD', 'GBP'];
const initialRates = { EUR: {}, USD: {}, GBP: {} };

const theme = createMuiTheme({
    palette: {
        primary: { main: '#10316b' },
        secondary: { main: '#000000' },
        background: { default: '#14213D', light: '#E5E5E5' },
    },

    status: {
        danger: 'orange',
    },
});

export default function App() {
    const [rates, dispatch] = useReducer(addCurrencyRate, initialRates);
    const [selected, setSelected] = useState({ origin: 'EUR', target: 'USD', value: 0 });

    useEffect(() => {
        const fetchData = async (target, base = 'EUR') => {
            target = target.filter(currency => currency !== base);

            let query = `?symbols=${target.join()}`;

            if (base !== 'EUR') {
                query += `&base=${base}`;
            }

            const request = await axios(API + query);
            const data = request.data;

            dispatch({type: 'ADD', payload: {[base]: data.rates}});
        };

        defaultCurrencies.map(currency => fetchData(defaultCurrencies, currency));
    }, []);

    const handleInputChange = ev => {
        setSelected({...selected, value: ev.target.value});
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

                    <Grid item xs={6}>
                        <CurrencyCard selected={selected} rates={rates} onChange={handleInputChange} tabChange={handleTabChange} />
                    </Grid>

                    <Grid item xs={6}>
                        <CurrencyCard selected={selected} rates={rates} readOnly={true} tabChange={handleTabChange} />
                    </Grid>
                </Grid>
            </Container>

            <CssBaseline />
        </ThemeProvider>
    );
}