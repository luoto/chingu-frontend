import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation createUser($user_data: UserCreateInput!, $application_data: JSON!){
    createUser(user_data:$user_data, application_data:$application_data) {
      id
      avatar
      username
      status
      background
      interests
      coding_history
      country
      skills {
          name
      }
      teams {
        id
        title
        cohort {
          id
          title
          start_date
          end_date
          status
        }
      }
    }
  }
`
export const AUTH_MUTATION = gql`
  mutation userGithubAuth($code: String!) {
    userAuthGithub(code: $code) 
  }
`;
