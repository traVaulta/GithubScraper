import React from 'react';
import {cleanup, render, waitForElement} from '@testing-library/react';
import {ApolloProvider} from '@apollo/react-hooks';
import {MockedProvider} from '@apollo/react-testing';

import {RepositoriesListWithData} from '../index';
import {client} from '../../../graphql';
import {GET_REPOSITORIES} from '../../../graphql/github/getRepositories';

const mockedError = [{
    request: {
        query: GET_REPOSITORIES,
        variables: {
            login: 'tra',
        },
    },
    result: {
        error: 'Error 404: Not found!'
    },
}];

describe(`${RepositoriesListWithData.name}`, () => {
    afterEach(cleanup);

    it('should render with initial note', () => {
        const {getByText} = render((
            <ApolloProvider client={client}>
                <RepositoriesListWithData/>
            </ApolloProvider>
        ));
        const element = getByText('Start browsing repositories - enter user profile in search first...');
        expect(element).toBeInTheDocument();
    });

    it('should render with note about error', async () => {
        const {getByText} = render((
            <MockedProvider mocks={mockedError} addTypename={false}>
                <RepositoriesListWithData/>
            </MockedProvider>
        ));
        const element = await waitForElement(() =>
            getByText('An error occurred, try again later or refresh the page...')
        );
        expect(element).toBeInTheDocument();
    });
});
