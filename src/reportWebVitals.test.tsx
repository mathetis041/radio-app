import reportWebVitals from './reportWebVitals';
import { act } from 'react';
import { ReportHandler } from 'web-vitals';

// Mock the web-vitals module and its functions
jest.mock('web-vitals', () => ({
    getCLS: jest.fn(),
    getFID: jest.fn(),
    getFCP: jest.fn(),
    getLCP: jest.fn(),
    getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call the web-vitals functions with the provided onPerfEntry function', async () => {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');
        const onPerfEntry = jest.fn();

        // Call the function
        await act(async () => {
            reportWebVitals(onPerfEntry);
        });

        // Check if each web-vitals function was called with onPerfEntry
        expect(getCLS).toHaveBeenCalledWith(onPerfEntry);
        expect(getFID).toHaveBeenCalledWith(onPerfEntry);
        expect(getFCP).toHaveBeenCalledWith(onPerfEntry);
        expect(getLCP).toHaveBeenCalledWith(onPerfEntry);
        expect(getTTFB).toHaveBeenCalledWith(onPerfEntry);
    });

    it('should not call the web-vitals functions if onPerfEntry is not a function', async () => {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

        // Call the function without onPerfEntry
        await act(async () => {
            reportWebVitals();
        });

        // Check that none of the web-vitals functions were called
        expect(getCLS).not.toHaveBeenCalled();
        expect(getFID).not.toHaveBeenCalled();
        expect(getFCP).not.toHaveBeenCalled();
        expect(getLCP).not.toHaveBeenCalled();
        expect(getTTFB).not.toHaveBeenCalled();
    });
});
