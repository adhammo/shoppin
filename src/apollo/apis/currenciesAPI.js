import client from '../client'

import { LIST_CURRENCIES } from 'graphql/queries'

export const listCurrencies = async () => {
  const {
    data: { currencies },
  } = await client.query({ query: LIST_CURRENCIES })
  return currencies
}
