import React from 'react';
import {render} from '@testing-library/react';

import {AppHeader} from '../header';

describe(`${AppHeader.name}`, () => {
    it('should render', () => {
        const {asFragment} = render(<AppHeader/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
