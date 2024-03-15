import { gql } from "@apollo/client";

export const queryGetUsers = gql`
  query getUsers {
    getUsers {
      id
      email
      firstname
      lastname
      nickname
    }
  }
`;
