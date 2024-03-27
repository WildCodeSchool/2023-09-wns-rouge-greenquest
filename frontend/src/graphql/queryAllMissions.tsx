import { gql } from "@apollo/client";

export const queryAllMissions = gql`
  query getMissions($sortBy: Difficulty) {
    getMissions(sortBy: $sortBy) {
      id
      title
      description
      XPValue
      difficulty
      byDefault
    }
  }
`;
