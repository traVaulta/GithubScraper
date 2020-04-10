import React from 'react';
import {cleanup, fireEvent, render, waitForElement} from '@testing-library/react';
import {ApolloProvider} from '@apollo/react-hooks';
import {MockedProvider} from '@apollo/react-testing';
import * as _ from 'lodash';

import {
    GetRepositoriesInitialQuery,
    GetRepositoriesInitialQueryVariables,
    OrderDirection,
    RepositoryEdge
} from '../../../graphql/types';
import {GET_REPOSITORIES_INITIAL} from '../../../graphql/github/getRepositoriesInitial';
import {client} from '../../../graphql';
import {DEFAULT_PAGE_SIZE, RepositoryOwnerLookup} from '../index';

const mockError = () => [{
    request: {
        query: GET_REPOSITORIES_INITIAL,
        variables: {
            login: 'tra',
        },
    },
    result: {
        error: 'Error 404: Not found!'
    },
}];

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

/*
// default loading and done successfully
{loading: true, error: undefined, data: undefined, counter: 1}
{loading: true, error: undefined, data: undefined, counter: 2}
{loading: false, error: undefined, data: {repositoryOwner: null}, counter: 3}
{loading: false, error: undefined, data: {repositoryOwner: null}, counter: 4}
*/
const mockLoadedDefaultRequest = {
    request: {
        query: GET_REPOSITORIES_INITIAL,
        variables: {
            login: '',
            order: OrderDirection.Asc,
            pageSize: DEFAULT_PAGE_SIZE
        } as GetRepositoriesInitialQueryVariables,
    },
    result: {
        loading: false,
        data: {
            __typename: 'Query',
            repositoryOwner: null
        } as GetRepositoriesInitialQuery,
        error: void 0
    }
};

/*
// query loading and done successfully
{loading: true, error: undefined, data: undefined, counter: 1}
{loading: true, error: undefined, data: undefined, counter: 2}
{loading: true, error: undefined, data: undefined, counter: 3}
{loading: false, error: undefined, data: {...mockedResponse}, counter: 4}
{loading: false, error: undefined, data: {...mockedResponse}, counter: 5}
{loading: false, error: undefined, data: {...mockedResponse}, counter: 6}
{loading: false, error: undefined, data: {...mockedResponse}, counter: 7}
*/
const mockLoadedSuccessRequest = {
    request: {
        query: GET_REPOSITORIES_INITIAL,
        variables: {
            login: 'front',
            order: OrderDirection.Asc,
            pageSize: DEFAULT_PAGE_SIZE
        } as GetRepositoriesInitialQueryVariables,
    },
    result: {
        loading: false,
        data: {
            __typename: 'Query',
            repositoryOwner: {
                __typename: 'User',
                avatarUrl: '',
                login: 'frontend',
                email: 'frontend@community.com',
                url: 'https://github.com/frontend',
                repositories: {
                    __typename: 'RepositoryConnection',
                    totalCount: _.size(repositories),
                    edges: _.map(repositories, ({name, description, url}) => ({
                        __typename: 'RepositoryEdge',
                        cursor: `2if3904f4k39k94k39${name}`,
                        node: {
                            __typename: 'Repository',
                            name,
                            description,
                            url
                        }
                    } as RepositoryEdge))
                }
            }
        } as GetRepositoriesInitialQuery,
        error: void 0
    }
};

const mockSuccess = () => [
    mockLoadedDefaultRequest,
    mockLoadedSuccessRequest
];

describe(`${RepositoryOwnerLookup.name}`, () => {
    afterEach(cleanup);

    it('should render with initial note', () => {
        const {getByText} = render((
            <ApolloProvider client={client}>
                <RepositoryOwnerLookup/>
            </ApolloProvider>
        ));
        const element = getByText('Start browsing repositories - enter user profile in search first...');
        expect(element).toBeInTheDocument();
    });

    it('should render with note about error', async () => {
        const {getByText} = render((
            <MockedProvider mocks={mockError()} addTypename={false}>
                <RepositoryOwnerLookup/>
            </MockedProvider>
        ));
        const element = await waitForElement(() =>
            getByText('An error occurred, try again later or refresh the page...')
        );
        expect(element).toBeInTheDocument();
    });

    it('should render with ...', async () => {
        const {getByText, getAllByLabelText} = render((
            <MockedProvider mocks={mockSuccess()} addTypename={false}>
                <RepositoryOwnerLookup/>
            </MockedProvider>
        ));
        const element = getByText('Start browsing repositories - enter user profile in search first...');
        expect(element).toBeInTheDocument();

        const inputs = await waitForElement(() => getAllByLabelText('search-bar--input') as HTMLInputElement[]);
        expect(inputs).toHaveLength(1);

        fireEvent.change(inputs[0], {target: {value: 'front'}});

        expect(inputs[0].value).toEqual('front');

        const reactRepository = await waitForElement(() => getByText(/react/i));
        const angularRepository = await waitForElement(() => getByText(/angular/i));
        const vueRepository = await waitForElement(() => getByText(/vue/i));
        const emberRepository = await waitForElement(() => getByText(/ember/i));
        const backboneRepository = await waitForElement(() => getByText(/backbone/i));

        expect(reactRepository).toBeInTheDocument();
        expect(angularRepository).toBeInTheDocument();
        expect(vueRepository).toBeInTheDocument();
        expect(emberRepository).toBeInTheDocument();
        expect(backboneRepository).toBeInTheDocument();
    });
});
