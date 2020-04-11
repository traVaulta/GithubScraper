import * as _ from 'lodash';

import {RepositoryEdge} from '../../../../graphql/types';
import {mapRepositoryEdges} from '../index';

const repositories = [
    {
        name: 'AwesomeReactRepo',
        description: 'Awesome React project :smile:',
        url: 'https://github.com/frontend/react'
    },
    {
        name: 'AwesomeAngularRepo',
        description: 'Awesome Angular project :smile:',
        url: 'https://github.com/frontend/angular'
    },
    {
        name: 'AwesomeVueRepo',
        description: 'Awesome Vue project :smile:',
        url: 'https://github.com/frontend/vue'
    },
    {
        name: 'AwesomeEmberRepo',
        description: 'Awesome Ember project :smile:',
        url: 'https://github.com/frontend/ember'
    },
    {
        name: 'AwesomeBackboneRepo',
        description: 'Awesome Backbone project :smile:',
        url: 'https://github.com/frontend/backbone'
    }
];

const repositoryEdges = _.map(repositories, ({name, description, url}) => ({
    __typename: 'RepositoryEdge',
    cursor: `${name}`,
    node: {
        __typename: 'Repository',
        name,
        description,
        url
    }
} as RepositoryEdge));

const repositoryEdgesNoName = _.map(repositories, ({name, description, url}) => ({
    __typename: 'RepositoryEdge',
    cursor: `${name}`,
    node: {
        __typename: 'Repository',
        name: '',
        description,
        url
    }
} as RepositoryEdge));

describe(`${mapRepositoryEdges.name}`, () => {
    it('should map edges properly', () => {
        const mapped = mapRepositoryEdges(repositoryEdges);
        expect(mapped).toHaveLength(repositories.length);
        expect(mapped[0].name).toEqual(repositories[0].name);
    });

    it('should map edges with no name', () => {
        const mapped = mapRepositoryEdges(repositoryEdgesNoName);
        expect(mapped).toHaveLength(repositories.length);
        expect(mapped[0].name).toEqual('');
    });
});
