import { gql } from "@apollo/client";

export const mutationUpdateUser = gql`
  mutation updateUser(
    $firstname: String!
    $lastname: String!
    $nickname: String!
  ) {
    updateUser(
      data: { firstname: $firstname, lastname: $lastname, nickname: $nickname }
    ) {
      id
    }
  }
`;
