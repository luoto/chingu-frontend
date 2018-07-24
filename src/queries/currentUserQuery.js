import gql from "graphql-tag";

const currentUserQuery = gql`
  query currentUserQuery {
    user {
      id
      avatar
      username
      country
      background
      interests
      coding_history
    }
  }
`;

export default currentUserQuery;