import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from '../../graphql';
import {RepositoriesListWithData} from '../repository-list';

export const styles = {paddingLeft: '20px'};

const App = () => (
    <div className="container">
        <ApolloProvider client={client}>
            <RepositoriesListWithData/>
        </ApolloProvider>
    </div>
);

export default App;
