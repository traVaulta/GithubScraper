import {gql} from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query GetRepositories($login: String!) {
    repositoryOwner(login: $login) {
        repositories(orderBy: {field:NAME, direction:ASC}, first:100) {
            nodes {
                name
                url
            }
            totalCount
        }
    }
}`;
