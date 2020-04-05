import ApolloClient, {PresetConfig} from 'apollo-boost';

export const token = process.env.REACT_APP_GITHUB_TOKEN;
export const client = new ApolloClient({
    uri: '/graphql',
    headers: {
        'Authorization': `bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
    }
} as PresetConfig);
