import { gql } from '@apollo/client/core';

export const REPOSITORY_SUMMARY_FRAGMENT = gql`
fragment RepositorySummary on Repository {
  __typename
  name
  description
  url
}`;
