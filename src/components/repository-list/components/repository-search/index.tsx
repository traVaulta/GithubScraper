import React, {useRef} from 'react';
import * as _ from 'lodash';

export interface Props {
    pattern?: string;
    resultsCount?: number;
    onPatternChange: (value: string) => void;
}

export const RepositorySearch = (props: Props) => {
    const {pattern, onPatternChange, resultsCount} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = () => onPatternChange(_.get(inputRef, 'current.value', ''));

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar search-bar--input"
                placeholder="Enter github user here..."
                ref={inputRef}
                value={pattern}
                onChange={onChange}
            />
            <span> <i className="fa fa-search"/></span>
            {!_.isNil(resultsCount) && _.gt(resultsCount, 0) && (
                <span> {resultsCount} <i className="fa fa-github"/></span>
            )}
        </div>
    );
};
