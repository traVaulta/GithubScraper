import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {RepositoryFilter} from '../repository-filter';

describe(`${RepositoryFilter.name}`, () => {
    it('should render without count', () => {
        const mockFn = () => {
        };
        const {container} = render(
            <RepositoryFilter totalCount={0} onPatternChange={mockFn} onSortChange={mockFn}/>
        );
        expect(container.querySelector('.fa-search')).toBeInTheDocument();
        expect(container.querySelector('.fa-github')).not.toBeInTheDocument();
    });

    it('should render with count', () => {
        const mockFn = () => {
        };
        const {container} = render(
            <RepositoryFilter totalCount={12} onPatternChange={mockFn} onSortChange={mockFn}/>
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
        const mockFn = () => {
        };
        const {getByLabelText} = render(
            <RepositoryFilter onPatternChange={onPatternChange} onSortChange={mockFn}/>
        );

        const searchInput: HTMLInputElement = getByLabelText('search-bar--input') as HTMLInputElement;
        fireEvent.change(searchInput, {target: {value: 'tra'}});

        expect(searchInput.value).toBe('tra');
        expect(externalState.searchPattern).toEqual('tra');
    });
});
