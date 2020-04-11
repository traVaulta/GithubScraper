import React from 'react';
import * as _ from 'lodash';

import {RepositoryFilter} from '../repository-filter';
import {RepositorySummary} from '../repository-summary';
import {RepositorySummaryDTO} from '../../../models';

export interface Props {
    repositories: RepositorySummaryDTO[];
    resultsCount?: number;
    focus?: boolean;
    filterPattern?: string;
    isAsc?: boolean
    triggerSearch: (pattern: string) => void;
    sortChange: (isAsc: boolean) => void;
    note?: string;
}

const RepositoriesList = (props: Props) => {
    const {filterPattern, focus, isAsc, note, repositories, resultsCount, sortChange, triggerSearch} = props;
    return (
        <div className="push-down">
            <RepositoryFilter
                filteredResultsCount={_.size(repositories)}
                focus={focus}
                isAsc={isAsc}
                pattern={filterPattern}
                onPatternChange={triggerSearch}
                resultsCount={resultsCount}
                onSortChange={sortChange}
            />

            {!note && _.map(repositories, (repository: RepositorySummaryDTO, id: number) =>
                <RepositorySummary key={id} repositorySummary={repository}/>
            )}

            {!!note && <div className="container">{note}</div>}
        </div>
    );
};

const RepositoriesListCached = React.memo(RepositoriesList);

export default RepositoriesListCached
