import React from 'react';
import mockAxios from "jest-mock-axios";
import { shallow, mount } from 'enzyme';

import App, { fetchData, defaultCurrencies, API } from '../App';

describe('App', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    it('Renders without crashing', () => {
        shallow(<App />);
    });
    
    it('fetches rates correctly', async () => {
        const setRates = jest.fn().mockResolvedValue();

        fetchData(['USD'], 'EUR', setRates);

        expect(mockAxios.get).toHaveBeenCalled();
        expect(mockAxios.get).toHaveBeenCalledWith(`${API}?symbols=USD`);

        mockAxios.mockResponse({
            data: {
                base: 'EUR',
                date: '2019-11-15',
                rates: { USD: 1.1034, GBP: 0.8566 }
            }
        });

        // expect(setRates).toHaveBeenCalled();
    });

    it('fetches rates when app is mounted', async () => {
        mount(<App />);

        const requestsMade = defaultCurrencies.length;

        expect(mockAxios.get).toHaveBeenCalledTimes(requestsMade);
    });
    
    it('displays two currency cards', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('.MuiPaper-rounded')).toHaveLength(2);
    });
});
