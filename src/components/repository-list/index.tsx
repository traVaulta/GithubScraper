import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import * as _ from 'lodash';

import {GET_REPOSITORIES} from '../../graphql/github/getRepositories';
import RepositoriesList from './components/repository-list';
import {RepositorySearch} from './components/repository-search';
import {RepositorySummaryDTO} from './models';

export enum SearchStatus {
    INITIAL,
    RESULTS_LOAD,
    RESULTS_SUCCESS,
    RESULTS_NOT_FOUND,
    RESULTS_ERROR
}

export const RepositoriesListWithData = () => {
    const [searchStatus, changeSearchStatus] = useState(SearchStatus.INITIAL);

    const [searchPattern, changeSearchPattern] = useState('');
    const {loading, error, data} = useQuery(GET_REPOSITORIES, {variables: {login: searchPattern}});

    const triggerSearch = (pattern: string) => {
        if (_.isEmpty(pattern)) {
            changeSearchStatus(SearchStatus.INITIAL)
        } else {
            changeSearchStatus(SearchStatus.RESULTS_LOAD);
        }
        changeSearchPattern(pattern);
    };

    let repositories: RepositorySummaryDTO[] = [];
    if (_.get(data, 'repositoryOwner.repositories.nodes')) {
        repositories = _.get(data, 'repositoryOwner.repositories.nodes', []);
    }
    const hasResults = !_.isEmpty(repositories) && !error;
    const resultsCount = hasResults ? _.size(repositories) : void 0;

    useEffect(() => {
        const isLoading = _.isEqual(searchStatus, SearchStatus.RESULTS_LOAD);
        if (error) {
            changeSearchStatus(SearchStatus.RESULTS_ERROR);
        } else if (!loading && !error && hasResults && isLoading) {
            changeSearchStatus(SearchStatus.RESULTS_SUCCESS);
        } else if (!loading && !error && !hasResults && isLoading) {
            changeSearchStatus(SearchStatus.RESULTS_NOT_FOUND);
        }
    }, [loading, error, hasResults, searchStatus]);

    const renderResultsFound = () => ((<RepositoriesList repositories={repositories}/>));
    const renderWithNote = (note: string) => (
        <div className="container">{note}</div>
    );

    return (
        <>
            <RepositorySearch pattern={searchPattern} onPatternChange={triggerSearch} resultsCount={resultsCount}/>
            {(status => {
                switch (status) {
                    case SearchStatus.RESULTS_SUCCESS:
                        return renderResultsFound();
                    case SearchStatus.RESULTS_NOT_FOUND:
                        return renderWithNote('No results (0 found)...');
                    case SearchStatus.RESULTS_ERROR:
                        return renderWithNote('An error occurred, try again later or refresh the page...');
                    case SearchStatus.RESULTS_LOAD:
                        return renderWithNote('Loading results...');
                    case SearchStatus.INITIAL:
                    default:
                        return renderWithNote('Start browsing repositories - enter user profile in search first...');
                }
            })(searchStatus)}
        </>
    );
};
