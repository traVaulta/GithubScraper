import React from 'react';
import * as _ from 'lodash';

import {SearchBar} from '../../../../shared/components/search-bar';

export interface Props {
    focus?: boolean;
    isAsc?: boolean
    pattern?: string;
    resultsCount?: number;
    filteredResultsCount?: number;
    onPatternChange: (value: string) => void;
    onSortChange: (isAsc: boolean) => void;
}

export const RepositoryFilter = (props: Props) => {
    const {filteredResultsCount: count, focus, pattern, onPatternChange, onSortChange, resultsCount: total} = props;
    const hasResults = !_.isNil(total) && _.gt(total, 0);
    const isFilteringResults = !_.isNil(count) && _.gt(count, 0) && !_.eq(count, total);
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
                        {isFilteringResults ?
                            <span> <i className="fa fa-github"/> {total} total ({count} shown)</span> :
                            <span> <i className="fa fa-github"/> {total} total</span>
                        }
                        <span>  <span className="sort-button" onClick={() => onSortChange(!props.isAsc)}>
                            {
                                !props.isAsc ?
                                    <span><i className="fa fa-caret-down"/> DESC</span> :
                                    <span><i className="fa fa-caret-up"/> ASC</span>
                            }
                        </span></span>
                    </div>
                </div>
            )}
        </SearchBar>
    );
};
