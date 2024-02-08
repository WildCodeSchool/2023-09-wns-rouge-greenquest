import { gql } from "@apollo/client";

export const queryAllMissions = gql`
  query getMissions {
    getMissions {
      id
      title
      description
      XPValue
      difficulty
      byDefault
    }
  }
`;
