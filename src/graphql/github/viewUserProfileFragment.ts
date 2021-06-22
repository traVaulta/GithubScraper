import { gql } from '@apollo/client/core';

export const USER_PROFILE_FRAGMENT = gql`
fragment UserProfile on User {
  __typename
  avatarUrl
  login
  email
  url
}`;
