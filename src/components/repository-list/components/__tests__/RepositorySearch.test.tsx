import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {RepositorySearch} from '../repository-search';

describe(`${RepositorySearch.name}`, () => {
    it('should render without count', () => {
        const onPatternChange = () => {};
        const {container} = render(
            <RepositorySearch resultsCount={0} onPatternChange={onPatternChange}/>
        );
        expect(container.querySelector('.fa-search')).toBeInTheDocument();
        expect(container.querySelector('.fa-github')).not.toBeInTheDocument();
    });

    it('should render with count', () => {
        const onPatternChange = () => {};
        const {container} = render(
            <RepositorySearch resultsCount={12} onPatternChange={onPatternChange}/>
        );
        expect(container.querySelector('.fa-search')).toBeInTheDocument();
        expect(container.querySelector('.fa-github')).toBeInTheDocument();
    });

    it('should trigger external state change', () => {
        const externalState: { searchPattern: string | null | undefined } = {
            searchPattern: void 0
        };
        const onPatternChange = (value: string) => {
            externalState.searchPattern = value;
        };
        const {container} = render(
            <RepositorySearch onPatternChange={onPatternChange}/>
        );

        const searchInput: HTMLInputElement = container.firstChild?.firstChild as HTMLInputElement;
        fireEvent.change(searchInput, {target: {value: 'tra'}});

        expect(searchInput.value).toBe('tra');
        expect(externalState.searchPattern).toEqual('tra');
    });
});
