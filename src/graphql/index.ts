import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

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
    const cache = new InMemoryCache();

    return {
        link,
        cache
    }
};

export const client = new ApolloClient(provideClientConfig());
