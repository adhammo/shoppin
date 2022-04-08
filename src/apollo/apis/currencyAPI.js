import client from '../client'

import { QUERY_CURRENCIES } from 'graphql/queries'

export const fetchCurrencies = async () => {
  const {
    data: { currencies },
  } = await client.query({ query: QUERY_CURRENCIES })
  return currencies
}
