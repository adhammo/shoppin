import client from '../client'

import { QUERY_CATEGORIES, QUERY_CATEGORY } from 'graphql/queries'

export const fetchCategories = async () => {
  const {
    data: { categories },
  } = await client.query({ query: QUERY_CATEGORIES })
  return categories
}

export const fetchCategory = async categoryName => {
  const {
    data: { category },
  } = await client.query({
    query: QUERY_CATEGORY,
    variables: { name: categoryName },
  })
  return category
}
