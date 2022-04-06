import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: 'https://junior-scandi-endpoint.herokuapp.com',
})

export default client
