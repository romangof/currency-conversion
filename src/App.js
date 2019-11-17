import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Grid, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import CurrencyCard from "./components/CurrencyCard";

import './App.css';

const API = 'https://api.exchangeratesapi.io/latest';
const baseCurrencies = ['USD', 'GBP'];

const theme = createMuiTheme({
    palette: {
        primary: {main: '#10316b'},
        secondary: {main: '#000000'},
        background: {default: '#14213D', light: '#E5E5E5'},
    },

    status: {
        danger: 'orange',
    },
});

export default function App() {
    const [currencies, setCurrencies] = useState({});
    const [selected, setSelected] = useState({origin: 'EUR', target: 'USD', value: 0, rate: 1});

    useEffect(() => {
        const fetchData = async () => {
            const request = `${API}?symbols=${baseCurrencies.join()}`;
            const result = await axios(request);
            const data = result.data;

            setCurrencies({...data.rates, [data.base]: 1});
            setSelected({value: 0, origin: 'EUR', target: 'USD', rate: data.rates.USD});
        };

        fetchData();
    }, []);

    const handleInputChange = ev => {
        setSelected({...selected, value: ev.target.value});
    };

    const handleTabChange = (param, value, rate) => {
        setSelected({...selected, rate, [param]: value});
    };

    return (
        <ThemeProvider theme={theme}>
            <Container className="App" maxWidth={false}>

                {console.log(999, currencies, Object.keys(currencies))}

                <h1>title</h1>

                <Grid container className="Grid" justify="space-around" alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                        {/* <Paper>xs=12</Paper> */}
                        <CurrencyCard selected={selected} currencies={currencies} onChange={handleInputChange} tabChange={handleTabChange} param='origin' />
                    </Grid>

                    <Grid item xs={6}>
                        <CurrencyCard selected={selected} currencies={currencies} readOnly={true} tabChange={handleTabChange} param='target' />
                    </Grid>
                </Grid>
            </Container>

            <CssBaseline />
        </ThemeProvider>
    );
}