import { gql } from "@apollo/client";

export const queryMySelf = gql`
  query mySelf {
    item: mySelf {
      id
      email
    }
  }
`;