import ApolloClient, { gql } from 'apollo-boost';

// Increment version if the format of Store.state changes
const STORE_STATE_LOCAL_STORAGE_VERSION = 1;

const client = new ApolloClient({
  // uri: 'https://api.chingu.io/graphql',
  uri: 'https://6be5ac56.ngrok.io/graphql',
  request: operation => operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
});

const get_user = gql`
  query getStateUser {
    user {
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

function fetchStateFromLocalStorage() {
  const state = window.localStorage.getItem('store');
  if (!state) return {}
  return JSON.parse(state);
  // let stateFromLocalStorageJSON = localStorage.getItem('store');
  // if (stateFromLocalStorageJSON) {
  //   let stateFromLocalStorage = JSON.parse(stateFromLocalStorageJSON);
  //   if (stateFromLocalStorage.version === STORE_STATE_LOCAL_STORAGE_VERSION) {
  //     return stateFromLocalStorage;
  //   }
  // }
  // return {};
}

const shouldRefresh = () => {
  const lastChecked = window.localStorage.getItem('lastChecked');
  if (!lastChecked) return true;
  const difference = Number(new Date()) - Number(lastChecked);
  const minutes = 1; // change this to affect refresh time

  return difference > (minutes * 60 * 1000);
}

const updateLastChecked = () => {
  window.localStorage.setItem('lastChecked', JSON.stringify(Number(new Date())));
}

const State = fetchStateFromLocalStorage();

const Store = {
  client,
  state: State,

  getUserState: () => {
    console.log('called getUserState()')
    console.log(Store.state);
    // checks if an update is needed and calls an update
    if (shouldRefresh()) {
      // updates state in the background -> data made available on next access
      Store.getAuthedUser();
    }

    // return current information so not await is needed
    return Store.state.user;
  },

  getAuthedUser: async () => {
    console.log('calling get AuthedUser()')
    const user =
      await Store.client.query({ query: get_user })
        .catch(err => console.log(err));
    console.log(user)
    if (user) {
      Store.state['user'] = user.data.user;
      localStorage.setItem('store', JSON.stringify( { 'version' : STORE_STATE_LOCAL_STORAGE_VERSION, ...Store.state } ));
      updateLastChecked();
    }
  },

  updateAuthedUser: (newData) => {
    const currentData = window.localStorage.getItem('store') || {};
    const updatedUserState = { ...currentData, ...newData };
    Store.state['user'] = updatedUserState;
    window.localStorage.setItem(
      'store',
      JSON.stringify({ user: updatedUserState }),
    );
    updateLastChecked();
  },

  queries: {
    queryCreator: async (qgl, loader, error) => {
      loader();
      try {
        const { data } = await client.query({
          query: qgl
        })
        loader();
        return data;
      }
      catch (err) {
        console.log(err.message);
        loader();
        return error(err.message)
      }
    },
    queryVoyages: (loader, error, gql) => {
      return Store.queries.queryCreator(gql, loader, error)
    }
  },
  mutations: {
    mutationCreator: async (qgl, loader, error, params) => {
      loader();
      try {
        const { data } = await client.mutate({
          mutation: qgl,
          variables: params
        })
        loader();
        return data;
      }
      catch (err) {
        console.log(err.message);
        loader();
        return error(err.message)
      }
    },
    authUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
        .then(async data => {
          console.log('setting token')
          window.localStorage.setItem("token", data.userAuthGithub)
          await Store.getAuthedUser();
          console.log('after calling getAuthedUser()');
        })
        .catch(err => console.log(err));
    },
    createUser: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
        .then(({ createUser }) => Store.updateAuthedUser(createUser));
    },
    submitApplication: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
    submitWeeklyCheckin: (loader, error, params, gql) => {
      return Store.mutations.mutationCreator(gql, loader, error, params)
    },
  }
}

export default Store;