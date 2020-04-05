import React, {useState} from 'react';
import {RepositorySummaryDTO} from '../../models';

export const RepositorySummary = (props: { repositorySummary: RepositorySummaryDTO }) => {
    const [expanded, toggle] = useState(false);
    return (
        <>
            <div className="panel panel--info" onClick={() => toggle(!expanded)}>
                <span><a href={props.repositorySummary.url}>{props.repositorySummary.name}</a></span>
            </div>
            {expanded &&
                <div className="panel panel--info description-text">
                    {props.repositorySummary.description || 'No description available...'}
                </div>
            }
        </>
    );
};
