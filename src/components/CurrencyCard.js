import React, { useEffect } from 'react';
import { Card, Tabs, Tab, TextField } from '@material-ui/core';

export default function CurrencyCard({ selected, currencies, onChange, tabChange, param, readOnly = false}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (_ev, newValue) => setValue(newValue);

    const currencyRate = currencies[selected[param]] || 1;

    // useEffect(() => {
    //     console.log(arguments)
    // });

    return (
        <Card>
            <TextField
                multiline
                rowsMax="4"
                label="Amount"
                type="number"
                defaultValue={readOnly ? selected.value * selected.rate : selected.value}
                onChange={onChange}
                style={{width: '85%'}}
                margin="normal"
                // variant="filled"
                InputProps={{readOnly}}
            />

            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {Object.keys(currencies).map(currency => {
                    return <Tab key={currency} label={currency} onClick={() => tabChange(param, currency, currencies[currency])} />;
                })}
            </Tabs>
        </Card>
    );
}
