import React from 'react';
import {render} from '@testing-library/react';
import * as _ from 'lodash';

import App from '../index';

describe(`${App.name}`, () => {
    test('renders with class', () => {
        const {container, getByText} = render(<App/>);

        const noteElement = getByText('Start browsing repositories - enter user profile in search first...');
        const appElement = _.get(container, 'firstChild');

        expect(noteElement).toBeInTheDocument();
        expect(appElement).toHaveClass('container');
    });

    test('regression', () => {
        const {asFragment} = render(<App/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
