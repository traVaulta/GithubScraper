import {gql} from 'apollo-boost';

export const USER_PROFILE_FRAGMENT = gql`
fragment UserProfile on User {
  avatarUrl
  login
  email
  url
}`;
