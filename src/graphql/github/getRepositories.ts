import {gql} from 'apollo-boost';

import {REPOSITORY_SUMMARY_FRAGMENT} from './viewRepositorySummaryFragment';
import {USER_PROFILE_FRAGMENT} from './viewUserProfileFragment';

export const GET_REPOSITORIES = gql`
query GetRepositories($login: String!, $pageSize: Int!, $order: OrderDirection!, $cursor: String) {
  repositoryOwner(login: $login) {
    ...UserProfile
    repositories(orderBy: {field: NAME, direction: $order}, first: $pageSize, after: $cursor) {
      totalCount
      edges {
        cursor
        node {
          ...RepositorySummary
        }
      }
    }
  }
}
${USER_PROFILE_FRAGMENT}
${REPOSITORY_SUMMARY_FRAGMENT}
`;
