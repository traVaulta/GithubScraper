import ApolloClient, {InMemoryCache, IntrospectionFragmentMatcher, PresetConfig} from 'apollo-boost';
import introspectionResult from './types';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResult
});
const cache = new InMemoryCache({fragmentMatcher});

export const token = process.env.REACT_APP_GITHUB_TOKEN;
export const client = new ApolloClient({
    uri: '/graphql',
    headers: {
        'Authorization': `bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
    },
    cache
} as PresetConfig);
