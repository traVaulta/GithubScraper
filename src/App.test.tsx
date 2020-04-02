import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe(`${App.name}`, function () {
    test('renders learn react link', () => {
        const {getByText} = render(<App/>);
        const linkElement = getByText(/github scraper/i);
        expect(linkElement).toBeInTheDocument();
    });
});
