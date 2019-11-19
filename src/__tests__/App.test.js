import React from 'react';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import App, { fetchData, defaultCurrencies, API } from '../App';

jest.mock('axios');

describe('App', () => {
    afterEach(() => {
        axios.get.mockReset();
    });

    it('Renders without crashing', () => {
        shallow(<App />);
    });
    
    it('fetches rates correctly', async () => {
        axios.get.mockResolvedValue({
            data: {
                base: 'EUR',
                date: '2019-11-15',
                rates: { USD: 1.1034, GBP: 0.8566 }
            }
        });

        await fetchData(['USD'], 'EUR');

        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(`${API}?symbols=USD`);
    });

    it('fetches rates when app is mounted', async () => {
        axios.get.mockResolvedValue({
            data: {
                base: 'EUR',
                rates: { USD: 1.1034, GBP: 0.8566 }
            }
        }).mockResolvedValueOnce({
            data: {
                base: 'USD',
                rates: { EUR: 1.1034, GBP: 0.8566 }
            }
        }).mockResolvedValueOnce({
            data: {
                base: 'GBP',
                rates: { EUR: 1.1034, USD: 0.8566 }
            }
        });

        const wrapper = mount(<App />);

        const requestsMade = defaultCurrencies.length;

        await act(async () => {
            await Promise.resolve(wrapper);
            await new Promise(resolve => setImmediate(resolve));
            wrapper.update();
        });

        expect(axios.get).toHaveBeenCalledTimes(requestsMade);
    });
    
    it('displays two currency cards', () => {
        const wrapper = mount(<App />);
        
        expect(wrapper.find('.MuiPaper-rounded')).toHaveLength(2);
    });
});
