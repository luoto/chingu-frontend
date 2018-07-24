import ApolloClient from 'apollo-boost';

const Client = new ApolloClient({
  uri: 'http://localhost:8008/graphql',
  request: operation => operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }),
  clientState: {
    defaults: {
      user: {
        __typename: 'User',
        id: null
      }
    }
  }
});

export default Client;