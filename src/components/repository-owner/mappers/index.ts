import * as _ from 'lodash';

import {RepositoryEdge} from '../../../graphql/types';
import {RepositorySummaryDTO} from '../models';

export const mapRepositoryEdges = (repositoryEdges: RepositoryEdge[]) => _.map(repositoryEdges,
    (edge: RepositoryEdge): RepositorySummaryDTO => (
        {
            name: edge?.node?.name ?? '',
            description: edge?.node?.description,
            url: edge?.node?.url
        } as RepositorySummaryDTO)
);
