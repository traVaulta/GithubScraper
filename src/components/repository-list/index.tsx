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
import {RepositorySummaryDTO} from './models';
import RepositoriesList from './components/repository-list';
import {UserProfileSearch} from './components/user-profile-search';
import UserProfileSummary from './components/user-profile-summary';

export enum SearchStatus {
    INITIAL,
    RESULTS_LOAD,
    RESULTS_SUCCESS,
    RESULTS_NOT_FOUND,
    RESULTS_ERROR
}

export const DEFAULT_PAGE_SIZE = 5;

export const RepositoriesListWithData = () => {
    const [searchStatus, changeSearchStatus] = useState(SearchStatus.INITIAL);

    const [searchPattern, changeSearchPattern] = useState('');
    const [filterPattern, changeFilterPattern] = useState('');

    const {loading, error, data} = useQuery<GetRepositoriesInitialQuery>(GET_REPOSITORIES_INITIAL, {
        variables: {
            login: searchPattern,
            order: OrderDirection.Asc,
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

    const triggerSearchByUser = (pattern: string) => _.map([triggerSearch, changeSearchPattern], fn => fn(pattern));
    const triggerSearchByRepo = (pattern: string) => changeFilterPattern(pattern);

    let repositories: RepositorySummaryDTO[] = [];
    if (_.get(data, 'repositoryOwner.repositories.edges')) {
        let repositoryEdges = _.get(data, 'repositoryOwner.repositories.edges') as RepositoryEdge[];
        repositories = _.map(repositoryEdges, (edge: RepositoryEdge): RepositorySummaryDTO => (
            {
                name: edge?.node?.name ?? '',
                description: edge?.node?.description,
                url: edge?.node?.url
            } as RepositorySummaryDTO)
        );
    }

    const hasResults = !_.isEmpty(repositories) && !error;
    const resultsCount = hasResults ? data?.repositoryOwner?.repositories.totalCount : void 0;

    if (hasResults && !!filterPattern) {
        const rp = new RegExp(filterPattern);
        repositories = _.filter(repositories, repo => {
            return rp.test(repo.name.toLowerCase()) || rp.test(repo.description?.toLowerCase() ?? '');
        });
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
        } else if (!loading && !error && hasResults && isLoading) {
            changeSearchStatus(SearchStatus.RESULTS_SUCCESS);
        } else if (!loading && !error && !hasResults && isLoading) {
            changeSearchStatus(SearchStatus.RESULTS_NOT_FOUND);
        }
    }, [loading, error, hasResults, searchStatus]);

    const renderWithNote = (note: string) => (<div className="container">{note}</div>);
    const renderResultsFound = () => (
        <RepositoriesList
            focus={hasResults && !_.isEmpty(filterPattern)}
            filterPattern={filterPattern}
            repositories={repositories}
            resultsCount={resultsCount}
            triggerSearch={triggerSearchByRepo}
        />
    );

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
