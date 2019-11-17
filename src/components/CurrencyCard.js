import React from 'react';
import { Card, Tabs, Tab, TextField } from '@material-ui/core';

export default function CurrencyCard({ selected, rates, onChange, tabChange, readOnly = false}) {
    const tab = readOnly ? selected.target : selected.origin;
    const [selectedTab, setSelectedTab] = React.useState(tab);

    const handleChange = (_event, newValue) => setSelectedTab(newValue);

    const rate = rates[selected.origin][selected.target] || 1;
    const source = readOnly ? 'target' : 'origin';

    return (
        <Card>
            <TextField
                label="Amount"
                type="number"
                value={readOnly ? selected.value * rate : selected.value}
                onChange={onChange}
                style={{width: '85%'}}
                margin="normal"
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
                    return <Tab key={currency}
                        label={currency}
                        value={currency}
                        onClick={() => tabChange(source, currency)}
                    />;
                })}
            </Tabs>
        </Card>
    );
}
