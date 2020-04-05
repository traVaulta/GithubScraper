import React from 'react';
import {render} from '@testing-library/react';
import {ApolloProvider} from '@apollo/react-hooks';

import {RepositoriesListWithData} from '../index';
import {client} from '../../../graphql';

describe(`${RepositoriesListWithData.name}`, () => {
    it('should pass', () => {
        const {getByText} = render((
            <ApolloProvider client={client}>
                <RepositoriesListWithData/>
            </ApolloProvider>
        ));
        const element = getByText('Start browsing repositories - enter user profile in search first...');
        expect(element).toBeInTheDocument();
    });
});
