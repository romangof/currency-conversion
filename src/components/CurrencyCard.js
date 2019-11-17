import React from 'react';
import { Card, Tabs, Tab, TextField } from '@material-ui/core';

export default function CurrencyCard({ selected, rates, onChange, tabChange, readOnly = false}) {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (_ev, newValue) => setSelectedTab(newValue);

    const rate = rates[selected.origin][selected.target] || 1;
    const amount = parseInt(selected.value);
    const source = readOnly ? 'target' : 'origin';

    return (
        <Card>
            <TextField
                label="Amount"
                type="number"
                value={readOnly ? amount * rate : amount}
                onChange={onChange}
                style={{width: '85%'}}
                margin="normal"
                // variant="filled"
                InputProps={{readOnly}}
            />

            <Tabs
                value={selectedTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {Object.keys(rates).map(currency => {
                    return <Tab key={currency} label={currency} onClick={() => tabChange(source, currency)} />;
                })}
            </Tabs>
        </Card>
    );
}
