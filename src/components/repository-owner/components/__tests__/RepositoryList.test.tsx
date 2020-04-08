import React from 'react';
import {render} from '@testing-library/react';

import RepositoriesList from '../repository-list';

describe(`${RepositoriesList.name}`, () => {
    it('should render', () => {
        const repositories = [
            {
                name: 'AwesomeReactRepo',
                description: 'Awesome React project :smile:',
                url: 'https://github.com/react/master'
            },
            {
                name: 'AwesomeAngularRepo',
                description: 'Awesome Angular project :smile:',
                url: 'https://github.com/react/master'
            },
            {
                name: 'AwesomeEmberRepo',
                description: 'Awesome Ember project :smile:',
                url: 'https://github.com/react/master'
            },
            {
                name: 'AwesomeBackboneRepo',
                description: 'Awesome Backbone project :smile:',
                url: 'https://github.com/react/master'
            }
        ];
        const triggerSearch = () => {};
        const {getByText} = render(<RepositoriesList repositories={repositories} triggerSearch={triggerSearch}/>);
        const element = getByText(/react/i);
        expect(element).toBeInTheDocument();
    });
});
