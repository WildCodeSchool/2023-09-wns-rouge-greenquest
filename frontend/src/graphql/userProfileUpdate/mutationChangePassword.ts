import { gql } from "@apollo/client";

export const mutationChangePassword = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      input: { currentPassword: $currentPassword, newPassword: $newPassword }
    )
  }
`;
