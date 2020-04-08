import {gql} from 'apollo-boost';

import {REPOSITORY_SUMMARY_FRAGMENT} from './viewRepositorySummaryFragment';
import {USER_PROFILE_FRAGMENT} from './viewUserProfileFragment';

export const GET_REPOSITORIES_INITIAL = gql`
query GetRepositoriesInitial($login: String!, $pageSize: Int!, $order: OrderDirection!) {
  repositoryOwner(login: $login) {
    ...UserProfile
    repositories(orderBy: {field: NAME, direction: $order}, first: $pageSize) {
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
