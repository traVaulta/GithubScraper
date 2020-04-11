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
    triggerSearch: (pattern: string) => void;
    note?: string;
}

const RepositoriesList = (props: Props) => {
    const {filterPattern, focus, note, repositories, resultsCount, triggerSearch} = props;
    return (
        <div className="push-down">
            <RepositoryFilter
                filteredResultsCount={_.size(repositories)}
                focus={focus}
                pattern={filterPattern}
                onPatternChange={triggerSearch}
                resultsCount={resultsCount}
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
