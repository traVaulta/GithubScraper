import React from 'react';
import * as _ from 'lodash';

import {SearchBar} from '../../../../shared/components/search-bar';

export interface Props {
    focus?: boolean;
    isAsc?: boolean
    pattern?: string;
    loadedCount?: number;
    shownCount?: number;
    totalCount?: number;
    onPatternChange: (value: string) => void;
    onSortChange: (isAsc: boolean) => void;
}

export const RepositoryFilter = (props: Props) => {
    const {focus, pattern, onPatternChange, onSortChange, loadedCount, shownCount, totalCount} = props;
    const hasResults = !_.isNil(totalCount) && _.gt(totalCount, 0);
    const isFilteringResults = !_.isNil(shownCount) && _.gt(shownCount, 0) && !_.eq(shownCount, totalCount);
    return (
        <SearchBar
            focus={focus}
            pattern={pattern}
            placeholder="Enter GitHub repository name here..."
            onPatternChange={onPatternChange}
        >
            {hasResults && (
                <div className="user-counters">
                    <div className="panel panel--primary panel--content">
                        <span> <i className="fa fa-github"/> {totalCount} total{
                            isFilteringResults && !_.eq(loadedCount, shownCount) ?
                                <span> (shown {shownCount} / {loadedCount})</span> :
                                !_.eq(shownCount, totalCount) ?
                                    <span> ({loadedCount} shown)</span> :
                                    null
                        }  </span>
                        <span
                            aria-label="sort-button"
                            className="sort-button"
                            onClick={() => onSortChange(!props.isAsc)}
                        >{
                            !props.isAsc ?
                                <span><i className="fa fa-caret-down"/> DESC</span> :
                                <span><i className="fa fa-caret-up"/> ASC</span>
                        }</span>
                    </div>
                </div>
            )}
        </SearchBar>
    );
};
