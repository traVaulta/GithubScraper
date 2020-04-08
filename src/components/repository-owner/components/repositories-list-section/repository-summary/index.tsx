import React, {useState, MouseEvent} from 'react';
import {RepositorySummaryDTO} from '../../../models';
import Emoji from 'react-emoji-render';

import {noBubbling} from '../../../../shared/utils/event-handlers';

export const RepositorySummary = (props: { repositorySummary: RepositorySummaryDTO }) => {
    const [expanded, toggle] = useState(false);
    const toggleSummary = (_: MouseEvent) => toggle(!expanded);
    const openInNewTab = (_: MouseEvent) => window.open(props.repositorySummary.url, '_blank');
    return (
        <>
            <div className="panel panel--info panel--content" onClick={noBubbling(toggleSummary)}>
                <div className="panel panel--info panel--title">
                    <a href={props.repositorySummary.url}>{props.repositorySummary.name}</a>
                </div>
                <div className="panel panel--info panel--actions">
                    <button onClick={noBubbling(openInNewTab)}><i className="fa fa-external-link"/></button>
                </div>
            </div>
            {expanded && (
                <div className="panel panel--info panel--content description-text">
                    <Emoji text={props.repositorySummary.description || 'No description available...'}/>
                </div>
            )}
        </>
    );
};
