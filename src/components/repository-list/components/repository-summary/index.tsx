import React from 'react';
import {RepositorySummaryDTO} from '../../models';

export const RepositorySummary = (props: { repositorySummary: RepositorySummaryDTO }) => (
    <div className="panel panel--info">
        <span><a href={props.repositorySummary.url}>{props.repositorySummary.name}</a></span>
    </div>
);
