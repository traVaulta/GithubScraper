import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, InMemoryCacheConfig } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionResult from './types';

export const token = process.env.REACT_APP_GITHUB_TOKEN;
localStorage.setItem('token', `${token}`);

const provideClientConfig = () => {
    const httpLink = createHttpLink({
        uri: '/graphql',
    });

    const basic = setContext(() => ({
        headers: {
            Accept: 'charset=utf-8'
        }
    }));

    const auth = setContext(() => {
        const token = localStorage.getItem('token');

        if (token === null) {
            return {};
        } else {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
        }
    });

    const errorHandler = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const link = ApolloLink.from([basic, auth, errorHandler, httpLink]);
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspectionResult
    });

    const cache = new InMemoryCache({ fragmentMatcher } as InMemoryCacheConfig);

    return {
        link,
        cache
    }
};

export const client = new ApolloClient(provideClientConfig());
