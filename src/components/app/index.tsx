import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from '../../graphql';
import {RepositoryOwnerLookup} from '../repository-owner';

export const styles = {paddingLeft: '20px'};

const App = () => (
    <div className="container">
        <ApolloProvider client={client}>
            <RepositoryOwnerLookup/>
        </ApolloProvider>
    </div>
);

export default App;
