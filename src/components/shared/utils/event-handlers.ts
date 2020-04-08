import {MouseEvent} from 'react';

export const noBubbling = (fn: (evt: MouseEvent) => void) => {
    return (evt: MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        fn(evt);
    };
};
