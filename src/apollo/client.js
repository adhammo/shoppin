import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: 'https://deafening-egg-production.up.railway.app',
})

export default client
