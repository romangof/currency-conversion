import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tabs, Tab, TextField, InputAdornment } from '@material-ui/core';

const currencySigns = {
    EUR: '€',
    USD: '$',
    GBP: '£'
};

export default function CurrencyCard({ selected, rates, onChange, tabChange, readOnly = false}) {
    const tab = readOnly ? selected.target : selected.origin;
    const [selectedTab, setSelectedTab] = React.useState(tab);
    const rate = rates[selected.origin][selected.target] || 1;
    const source = readOnly ? 'target' : 'origin';

    const handleChange = (_event, newValue) => setSelectedTab(newValue);

    return (
        <Card>
            <TextField
                label="Amount"
                type="number"
                value={readOnly ? selected.value * rate : selected.value}
                onChange={onChange}
                style={{width: '85%'}}
                margin="normal"
                InputProps={{
                    readOnly,
                    startAdornment: <InputAdornment position="start">{currencySigns[tab]}</InputAdornment>
                }}
            />

            <Tabs
                value={selectedTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {Object.keys(rates).map(currency => {
                    return <Tab key={`${source}.${currency}`}
                        label={currency}
                        value={currency}
                        onClick={() => tabChange(source, currency)}
                    />;
                })}
            </Tabs>
        </Card>
    );
}

CurrencyCard.propTypes = {
    selected: PropTypes.shape({
        target: PropTypes.string,
        origin: PropTypes.string,
        value: PropTypes.number
    }),
    rates: PropTypes.object,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    tabChange: PropTypes.func.isRequired
};