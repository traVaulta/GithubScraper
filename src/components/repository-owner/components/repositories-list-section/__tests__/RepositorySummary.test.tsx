import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import snapshotDiff from 'snapshot-diff';

import {RepositorySummary} from '../repository-summary';

describe(`${RepositorySummary.name}`, () => {
    it('should render', () => {
        const repositoryDTO = {
            name: 'AwesomeReactRepo',
            description: 'Awesome React project :smile:',
            url: 'https://github.com/react/master'
        };
        const {getByText} = render(<RepositorySummary repositorySummary={repositoryDTO}/>);
        const element = getByText(/react/i);
        expect(element).toBeInTheDocument();
    });

    it('should display description on click', () => {
        const repositoryDTO = {
            name: 'AwesomeReactRepo',
            description: 'Awesome React project :smile:',
            url: 'https://github.com/react/master'
        };
        const {getByText, asFragment} = render(<RepositorySummary repositorySummary={repositoryDTO}/>);
        const firstRender = asFragment();
        const element = getByText(/react/i);

        expect(element).toBeInTheDocument();

        fireEvent.click(element);

        expect(snapshotDiff(firstRender, asFragment())).toMatchSnapshot();
    });

    it('should display default note when no description on click', () => {
        const repositoryDTO = {
            name: 'AwesomeReactRepo',
            url: 'https://github.com/react/master'
        };
        const {getByText, asFragment} = render(<RepositorySummary repositorySummary={repositoryDTO}/>);
        const firstRender = asFragment();
        const element = getByText(/react/i);

        expect(element).toBeInTheDocument();

        fireEvent.click(element);

        expect(snapshotDiff(firstRender, asFragment())).toMatchSnapshot();
        expect(getByText('No description available...')).toBeInTheDocument();
    });
});
