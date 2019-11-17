import React from 'react';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import App, { fetchData, defaultCurrencies, API } from '../App';

jest.mock('axios');

describe('App', () => {
    it('Renders without crashing', () => {
        shallow(<App />);
    });
    
    it('fetches rates correctly', async () => {
        const setRates = jest.fn().mockResolvedValue();

        axios.get.mockResolvedValue({
            data: {
                base: 'EUR',
                date: '2019-11-15',
                rates: { USD: 1.1034, GBP: 0.8566 }
            }
        });

        await fetchData(['USD'], 'EUR', setRates);

        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(`${API}?symbols=USD`);
        expect(setRates).toHaveBeenCalled();
    });

    xit('fetches rates when app is mounted', () => {
        act(() => {
            mount(<App />);

            const requestsMade = defaultCurrencies.length;

            axios.get.mockResolvedValue({
                data: {
                    // base: 'EUR',
                    // date: '2019-11-15',
                    // rates: { USD: 1.1034, GBP: 0.8566 }
                }
            });

            expect(axios.get).toHaveBeenCalledTimes(requestsMade);
        });
        
    });
    
    it('displays two currency cards', () => {
        act(() => {
            const wrapper = mount(<App />);
            expect(wrapper.find('.MuiPaper-rounded')).toHaveLength(2);
        });
    });
});
