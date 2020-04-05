import React from 'react';
import {render} from '@testing-library/react';

import RepositoriesList from '../repository-list';

describe(`${RepositoriesList.name}`, () => {
    it('should pass', () => {
        const repositories = [
            {
                name: 'AwesomeReactRepo',
                url: 'https://github.com/react/master'
            },
            {
                name: 'AwesomeAngularRepo',
                url: 'https://github.com/react/master'
            },
            {
                name: 'AwesomeEmberRepo',
                url: 'https://github.com/react/master'
            },
            {
                name: 'AwesomeBackboneRepo',
                url: 'https://github.com/react/master'
            }
        ];
        const {getByText} = render(<RepositoriesList repositories={repositories}/>);
        const element = getByText(/react/i);
        expect(element).toBeInTheDocument();
    });
});
