import React from 'react';
import * as _ from 'lodash';

import {SearchBar} from '../../../../shared/components/search-bar';

export interface Props {
    focus?: boolean;
    pattern?: string;
    resultsCount?: number;
    filteredResultsCount?: number;
    onPatternChange: (value: string) => void;
}

export const RepositoryFilter = (props: Props) => {
    const {filteredResultsCount, focus, pattern, onPatternChange, resultsCount} = props;
    const hasResults = !_.isNil(resultsCount) && _.gt(resultsCount, 0);
    const isFilteringResults = !_.isNil(filteredResultsCount) &&
        _.gt(filteredResultsCount, 0) &&
        !_.eq(filteredResultsCount, resultsCount);
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
                            <span> <i className="fa fa-github"/> {resultsCount} total ({filteredResultsCount} shown)</span> :
                            <span> <i className="fa fa-github"/> {resultsCount} total</span>}
                    </div>
                </div>
            )}
        </SearchBar>
    );
};
