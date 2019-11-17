const initialState = { EUR: {}, USD: {}, GBP: {} };

export function addCurrencyRate(state, action) {
    if (action.type === 'ADD') {
        return Object.assign(initialState, state, action.payload);
    }

    return initialState;
}

