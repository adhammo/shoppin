import client from '../client'

import { LIST_CATEGORIES, FETCH_CATEGORY } from 'graphql/queries'

export const listCategories = async () => {
  const {
    data: { categories },
  } = await client.query({ query: LIST_CATEGORIES })
  return categories.map(category => ({
    name: category.name,
    productsIds: category.products.map(product => product.id),
  }))
}

export const fetchCategory = async categoryName => {
  const {
    data: { category },
  } = await client.query({
    query: FETCH_CATEGORY,
    variables: { categoryName },
  })
  return {
    name: category.name,
    productsIds: category.products.map(product => product.id),
  }
}
