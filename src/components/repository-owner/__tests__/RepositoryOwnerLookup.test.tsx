import React from 'react';
import {cleanup, fireEvent, render, waitForElement} from '@testing-library/react';
import {ApolloProvider} from '@apollo/react-hooks';
import {MockedProvider, wait} from '@apollo/react-testing';
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

const mockSuccessNotFound = () => [
    mockLoadedDefaultRequest,
    {...mockLoadedDefaultRequest, request: {
            query: GET_REPOSITORIES_INITIAL,
            variables: {
                login: 'gibberish',
                order: OrderDirection.Asc,
                pageSize: DEFAULT_PAGE_SIZE
            } as GetRepositoriesInitialQueryVariables,
        }
    }
];

const mockSuccessReInitialize = () => [
    mockLoadedDefaultRequest,
    mockLoadedSuccessRequest,
    {...mockLoadedDefaultRequest, request: {
            query: GET_REPOSITORIES_INITIAL,
            variables: {
                login: 'gibberish',
                order: OrderDirection.Asc,
                pageSize: DEFAULT_PAGE_SIZE
            } as GetRepositoriesInitialQueryVariables,
        }
    }
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

    it('should render with note (not found)', async () => {
        const {getByText, getByLabelText} = render((
            <MockedProvider mocks={mockSuccessNotFound()} addTypename={false}>
                <RepositoryOwnerLookup/>
            </MockedProvider>
        ));

        const initialNote = await waitForElement(
            () => getByText('Start browsing repositories - enter user profile in search first...')
        );
        expect(initialNote).toBeInTheDocument();

        const userSearchInput = await waitForElement(() => getByLabelText('search-bar--input') as HTMLInputElement);
        fireEvent.change(userSearchInput, {target: {value: 'gibberish'}});
        expect(userSearchInput.value).toEqual('gibberish');

        const note = await waitForElement(() => getByText('No results (0 found)...'));
        expect(note).toBeInTheDocument();
        expect(note.classList).toHaveLength(1);
        expect(note.classList[0]).toEqual('container');
    });

    describe('with successful response', () => {
        const setupSuccessful = async (mock: Function) => {
            const {getByText, getByLabelText, getAllByLabelText, container} = render((
                <MockedProvider mocks={mock()} addTypename={false}>
                    <RepositoryOwnerLookup/>
                </MockedProvider>
            ));
            const element = getByText('Start browsing repositories - enter user profile in search first...');
            expect(element).toBeInTheDocument();

            const userSearchInput = await waitForElement(() => getByLabelText('search-bar--input') as HTMLInputElement);

            fireEvent.change(userSearchInput, {target: {value: 'front'}});

            expect(userSearchInput.value).toEqual('front');

            return {getByText, getByLabelText, getAllByLabelText, container};
        };

        const grabDisplayedUserInfo = async (getByText: Function) => {
            const userEmail = await waitForElement(() => getByText(/frontend@community.com/i));
            const reactRepository = await waitForElement(() => getByText(/react/i));
            const angularRepository = await waitForElement(() => getByText(/angular/i));
            const vueRepository = await waitForElement(() => getByText(/vue/i));
            const emberRepository = await waitForElement(() => getByText(/ember/i));
            const backboneRepository = await waitForElement(() => getByText(/backbone/i));

            return {
                userEmail,
                reactRepository,
                angularRepository,
                vueRepository,
                emberRepository,
                backboneRepository
            }
        };

        it('should render user profile and repositories with search working properly', async () => {
            const {getByText, getAllByLabelText} = await setupSuccessful(mockSuccess);
            const {
                userEmail,
                reactRepository,
                angularRepository,
                vueRepository,
                emberRepository,
                backboneRepository
            } = await grabDisplayedUserInfo(getByText);

            expect(userEmail).toBeInTheDocument();
            expect(reactRepository).toBeInTheDocument();
            expect(angularRepository).toBeInTheDocument();
            expect(vueRepository).toBeInTheDocument();
            expect(emberRepository).toBeInTheDocument();
            expect(backboneRepository).toBeInTheDocument();

            const inputs = await waitForElement(() => getAllByLabelText('search-bar--input') as HTMLInputElement[]);
            expect(inputs).toHaveLength(2);
            expect(inputs[0].value).toEqual('front');
            expect(inputs[1].value).toEqual('');

            fireEvent.change(inputs[1], {target: {value: 'react'}});
            await wait(0);

            expect(userEmail).toBeInTheDocument();
            expect(reactRepository).toBeInTheDocument();
            expect(angularRepository).not.toBeInTheDocument();
            expect(vueRepository).not.toBeInTheDocument();
            expect(emberRepository).not.toBeInTheDocument();
            expect(backboneRepository).not.toBeInTheDocument();
        });

        it('should render user profile and no results found note', async () => {
            const {getByText, getAllByLabelText} = await setupSuccessful(mockSuccess);
            const {
                userEmail,
                reactRepository,
                angularRepository,
                vueRepository,
                emberRepository,
                backboneRepository
            } = await grabDisplayedUserInfo(getByText);

            expect(userEmail).toBeInTheDocument();
            expect(reactRepository).toBeInTheDocument();
            expect(angularRepository).toBeInTheDocument();
            expect(vueRepository).toBeInTheDocument();
            expect(emberRepository).toBeInTheDocument();
            expect(backboneRepository).toBeInTheDocument();

            const inputs = await waitForElement(() => getAllByLabelText('search-bar--input') as HTMLInputElement[]);
            expect(inputs).toHaveLength(2);
            expect(inputs[0].value).toEqual('front');
            expect(inputs[1].value).toEqual('');

            fireEvent.change(inputs[1], {target: {value: 'java'}});
            await wait(0);
            expect(inputs[1].value).toEqual('java');

            expect(userEmail).toBeInTheDocument();
            expect(reactRepository).not.toBeInTheDocument();
            expect(angularRepository).not.toBeInTheDocument();
            expect(vueRepository).not.toBeInTheDocument();
            expect(emberRepository).not.toBeInTheDocument();
            expect(backboneRepository).not.toBeInTheDocument();

            const note = await waitForElement(() => getByText('No results (0 found)...'));
            expect(note).toBeInTheDocument();
        });

        it('should render note (not found) with empty search', async () => {
            const {getByText, getAllByLabelText} = await setupSuccessful(mockSuccessReInitialize);
            const {
                userEmail,
                reactRepository,
                angularRepository,
                vueRepository,
                emberRepository,
                backboneRepository
            } = await grabDisplayedUserInfo(getByText);

            expect(userEmail).toBeInTheDocument();
            expect(reactRepository).toBeInTheDocument();
            expect(angularRepository).toBeInTheDocument();
            expect(vueRepository).toBeInTheDocument();
            expect(emberRepository).toBeInTheDocument();
            expect(backboneRepository).toBeInTheDocument();

            const inputs = await waitForElement(() => getAllByLabelText('search-bar--input') as HTMLInputElement[]);
            expect(inputs).toHaveLength(2);
            expect(inputs[0].value).toEqual('front');
            expect(inputs[1].value).toEqual('');

            fireEvent.change(inputs[1], {target: {value: 'react'}});
            await wait(0);

            expect(userEmail).toBeInTheDocument();
            expect(reactRepository).toBeInTheDocument();
            expect(angularRepository).not.toBeInTheDocument();
            expect(vueRepository).not.toBeInTheDocument();
            expect(emberRepository).not.toBeInTheDocument();
            expect(backboneRepository).not.toBeInTheDocument();

            fireEvent.change(inputs[0], {target: {value: ''}});
            await wait(0);

            expect(inputs[0].value).toEqual('');
            expect(userEmail).not.toBeInTheDocument();
            expect(reactRepository).not.toBeInTheDocument();
            expect(angularRepository).not.toBeInTheDocument();
            expect(vueRepository).not.toBeInTheDocument();
            expect(emberRepository).not.toBeInTheDocument();
            expect(backboneRepository).not.toBeInTheDocument();

            const note = getByText('Start browsing repositories - enter user profile in search first...');
            expect(note).toBeInTheDocument();
            expect(note.classList).toHaveLength(1);
            expect(note.classList[0]).toEqual('container');
        });

        it('should toggle user profile summary', async () => {
            const {container, getByText} = await setupSuccessful(mockSuccess);
            const {userEmail} = await grabDisplayedUserInfo(getByText);
            expect(userEmail).toBeInTheDocument();
            expect(container.querySelector('.fa-window-minimize')).toBeInTheDocument();

            const toggleButton = container.querySelector('.minimize-icon') as HTMLButtonElement;

            fireEvent.click(toggleButton);
            wait(0);

            expect(container.querySelector('.fa-window-maximize')).toBeInTheDocument();
        });
    });
});
