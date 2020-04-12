import React from 'react';
import * as _ from 'lodash';

import {RepositoryFilter} from '../repository-filter';
import {RepositorySummary} from '../repository-summary';
import {RepositorySummaryDTO} from '../../../models';
import {noBubbling} from '../../../../shared/utils/event-handlers';

export interface Props {
    repositories: RepositorySummaryDTO[];
    totalCount?: number;
    loadedCount?: number;
    shownCount?: number;
    canLoadMore?: boolean;
    focus?: boolean;
    filterPattern?: string;
    isAsc?: boolean
    triggerLoad: () => void;
    triggerSearch: (pattern: string) => void;
    sortChange: (isAsc: boolean) => void;
    note?: string;
}

const RepositoriesList = (props: Props) => {
    return (
        <div className="push-down">
            <RepositoryFilter
                focus={props.focus}
                isAsc={props.isAsc}
                pattern={props.filterPattern}
                onPatternChange={props.triggerSearch}
                loadedCount={props.loadedCount}
                shownCount={props.shownCount}
                totalCount={props.totalCount}
                onSortChange={props.sortChange}
            />

            {!props.note && _.map(props.repositories, (repository: RepositorySummaryDTO, id: number) =>
                <RepositorySummary key={id} repositorySummary={repository}/>
            )}

            {!!props.note && <div className="container">{props.note}</div>}

            { !!props.canLoadMore && (
                <div className="panel panel--info panel--content"
                     aria-label="load-more-button" onClick={noBubbling(props.triggerLoad)}
                >
                    <div className="panel panel--info panel--title load-more-button">
                        Load more...
                    </div>
                </div>
            )}
        </div>
    );
};

const RepositoriesListCached = React.memo(RepositoriesList);

export default RepositoriesListCached
