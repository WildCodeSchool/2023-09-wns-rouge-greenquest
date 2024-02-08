import { gql } from "@apollo/client";

export const signup = gql`
  mutation Mutation($data: UserCreateInput!) {
    item: signup(data: $data) {
      id
    }
  }
`;
