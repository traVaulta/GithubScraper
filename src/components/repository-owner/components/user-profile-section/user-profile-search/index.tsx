import React from 'react';

import {SearchBar} from '../../../../shared/components/search-bar';

export  interface Props {
    pattern?: string;
    onPatternChange: (value: string) => void;
}

export const UserProfileSearch = (props: Props) => {
    const {pattern, onPatternChange} = props;
    return (
        <SearchBar
            pattern={pattern}
            placeholder="Enter GitHub username here..."
            onPatternChange={onPatternChange}
        />
    );
};
