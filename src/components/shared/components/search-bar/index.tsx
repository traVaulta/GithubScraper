import React, {ReactNode, ReactNodeArray, useRef} from 'react';
import * as _ from 'lodash';

export interface Props {
    children?: ReactNode | ReactNodeArray;
    focus?: boolean;
    pattern?: string;
    placeholder?: string;
    onPatternChange: (value: string) => void;
}

export const SearchBar = (props: Props) => {
    const {focus, pattern, placeholder, onPatternChange} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = () => {
        onPatternChange(_.get(inputRef, 'current.value', ''));
    };

    return (
        <div className="search-bar">
            <div className="search-bar search-bar--grouped-item">
                <input
                    type="text"
                    className="search-bar search-bar--input"
                    aria-label="search-bar--input"
                    placeholder={placeholder}
                    ref={inputRef}
                    value={pattern}
                    autoFocus={focus}
                    onChange={onChange}
                />
            </div>
            <div className="search-bar search-bar--grouped-item icon">
                <span> <i className="fa fa-search"/></span>
            </div>
            {props.children && <div className="search-bar search-bar--optional-item">
                {props.children}
            </div>}
        </div>
    );
};
