import React from 'react';
import {render} from '@testing-library/react';

import {AppFooter} from '../footer';

describe(`${AppFooter.name}`, () => {
    it('should render', () => {
        const {asFragment} = render(<AppFooter/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
