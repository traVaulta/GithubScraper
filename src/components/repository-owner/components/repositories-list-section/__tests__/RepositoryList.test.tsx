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
        const mockFn = () => {
        };
        const {getByText, getByLabelText} = render(<RepositoriesList
            canLoadMore={true}
            repositories={repositories}
            triggerLoad={mockFn}
            triggerSearch={mockFn}
            sortChange={mockFn}
        />);
        const element = getByText(/react/i);
        expect(element).toBeInTheDocument();
        expect(getByLabelText('load-more-button')).toBeInTheDocument();
    });

    it('should not display load more button', () => {
        const repositories = [
            {
                name: 'AwesomeReactRepo',
                description: 'Awesome React project :smile:',
                url: 'https://github.com/react/master'
            },
        ];
        const mockFn = () => {
        };
        const {getByText, container} = render(<RepositoriesList
            canLoadMore={false}
            repositories={repositories}
            triggerLoad={mockFn}
            triggerSearch={mockFn}
            sortChange={mockFn}
        />);
        const element = getByText(/react/i);
        expect(element).toBeInTheDocument();
        expect(container.querySelector('.load-more-button')).toBeFalsy();
    });
});
