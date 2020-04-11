import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import * as _ from 'lodash';

import {GET_REPOSITORIES_INITIAL} from '../../graphql/github/getRepositoriesInitial';
import {
    GetRepositoriesInitialQuery,
    GetRepositoriesInitialQueryVariables,
    OrderDirection,
    RepositoryEdge
} from '../../graphql/types';
import {mapRepositoryEdges} from './mappers';
import {RepositorySummaryDTO} from './models';
import RepositoriesList from './components/repositories-list-section/repository-list';
import {UserProfileSearch} from './components/user-profile-section/user-profile-search';
import UserProfileSummary from './components/user-profile-section/user-profile-summary';

export enum SearchStatus {
    INITIAL,
    RESULTS_LOAD,
    RESULTS_ERROR,
    RESULTS_SUCCESS,
    RESULTS_NOT_FOUND,
    RESULTS_FILTERED_NOT_FOUND,
}

export const DEFAULT_PAGE_SIZE = 5;

export const RepositoryOwnerLookup = () => {
    const [searchStatus, changeSearchStatus] = useState(SearchStatus.INITIAL);

    const [searchPattern, changeSearchPattern] = useState('');
    const [filterPattern, changeFilterPattern] = useState('');
    const [order, changeOrder] = useState(OrderDirection.Asc);

    const {loading, error, data} = useQuery<GetRepositoriesInitialQuery>(GET_REPOSITORIES_INITIAL, {
        variables: {
            login: searchPattern,
            order,
            pageSize: DEFAULT_PAGE_SIZE
        } as GetRepositoriesInitialQueryVariables
    });

    const triggerSearch = (pattern: string) => {
        if (_.isEmpty(pattern)) {
            changeSearchStatus(SearchStatus.INITIAL)
        } else {
            changeSearchStatus(SearchStatus.RESULTS_LOAD);
        }
    };

    const triggerSearchByUser = (pattern: string) => _.map([triggerSearch, changeSearchPattern, () => changeFilterPattern('')], fn => fn(pattern));
    const triggerSearchByRepo = (pattern: string) => changeFilterPattern(pattern);
    const isAscOrder = _.isEqual(order, OrderDirection.Asc);
    const triggerOrderChange = (isAsc: boolean) => isAsc ?
        changeOrder(OrderDirection.Asc) :
        changeOrder(OrderDirection.Desc);

    let repositories: RepositorySummaryDTO[] = [];
    if (_.get(data, 'repositoryOwner.repositories.edges')) {
        const repositoryEdges = _.get(data, 'repositoryOwner.repositories.edges') as RepositoryEdge[];
        repositories = mapRepositoryEdges(repositoryEdges);
    }

    let hasResults = !_.isEmpty(repositories) && !error;
    const resultsCount = hasResults ? data?.repositoryOwner?.repositories.totalCount : void 0;
    let isFiltering = false;

    if (hasResults && !!filterPattern) {
        const rp = new RegExp(filterPattern);
        repositories = _.filter(repositories, repo => rp.test(repo.name.toLowerCase()));
        isFiltering = true;
        hasResults = !_.isEmpty(repositories);
    }

    const [avatarUrl, username, email, url] = [
        _.get(data, 'repositoryOwner.avatarUrl'),
        _.get(data, 'repositoryOwner.login'),
        _.get(data, 'repositoryOwner.email'),
        _.get(data, 'repositoryOwner.url'),
    ];
    const hasUserProfile = !_.some([avatarUrl, username, email, url], _.isNil);

    useEffect(() => {
        const isLoading = _.isEqual(searchStatus, SearchStatus.RESULTS_LOAD);
        if (error) {
            changeSearchStatus(SearchStatus.RESULTS_ERROR);
        } else if (!error && !loading && isLoading && !hasResults) {
            changeSearchStatus(SearchStatus.RESULTS_NOT_FOUND);
        } else if (!error && !loading && !isLoading && !hasResults && isFiltering) {
            changeSearchStatus(SearchStatus.RESULTS_FILTERED_NOT_FOUND);
        } else if (!error && !loading && hasResults && (
            (isLoading && !isFiltering) || (!isLoading && !isFiltering)
        )) {
            changeSearchStatus(SearchStatus.RESULTS_SUCCESS);
        }
    }, [error, loading, hasResults, isFiltering, searchStatus]);

    const renderWithNote = (note: string) => (<div className="container">{note}</div>);
    const renderResultsWithNote = (note?: string) => (
        <RepositoriesList
            focus={isFiltering && !_.isEmpty(filterPattern)}
            filterPattern={filterPattern}
            isAsc={isAscOrder}
            repositories={repositories}
            resultsCount={resultsCount}
            sortChange={triggerOrderChange}
            triggerSearch={triggerSearchByRepo}
            note={note}
        />
    );
    const renderResultsFound = () => renderResultsWithNote();

    const [displayProfile, toggleDisplayProfile] = useState(true);
    const onToggleProfile = () => toggleDisplayProfile(!displayProfile);

    return (
        <>
            <UserProfileSearch pattern={searchPattern} onPatternChange={triggerSearchByUser}/>
            {hasUserProfile && (
                <UserProfileSummary
                    avatarUrl={avatarUrl}
                    name={username}
                    email={email}
                    url={url}
                    displayed={displayProfile}
                    toggleDisplay={onToggleProfile}
                />
            )}
            {(status => {
                switch (status) {
                    case SearchStatus.RESULTS_SUCCESS:
                        return renderResultsFound();
                    case SearchStatus.RESULTS_NOT_FOUND:
                        return renderWithNote('No results (0 found)...');
                    case SearchStatus.RESULTS_FILTERED_NOT_FOUND:
                        return renderResultsWithNote('No results (0 found)...');
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
