import {gql} from 'apollo-boost';

export const REPOSITORY_SUMMARY_FRAGMENT = gql`
fragment RepositorySummary on Repository {
  name
  description
  url
}`;
