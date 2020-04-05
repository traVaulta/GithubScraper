import React from 'react';

import {RepositorySummary} from '../repository-summary';
import {RepositorySummaryDTO} from '../../models';

const RepositoriesList = (props: { repositories: RepositorySummaryDTO[] }) => (
    <div>{
        props.repositories.map((repository: RepositorySummaryDTO, id: number) =>
            <RepositorySummary key={id} repositorySummary={repository}/>
        )
    }</div>
);

const RepositoriesListCached = React.memo(RepositoriesList);

export default RepositoriesListCached
