import client from '../client'

import { LIST_PRODUCTS, FETCH_PRODUCT } from 'graphql/queries'

export const listProducts = async () => {
  const {
    data: { categories },
  } = await client.query({ query: LIST_PRODUCTS })
  return Object.values(
    categories?.reduce((products, category) => {
      category.products.forEach(product => {
        products[product.id] = product
      })
      return products
    }, {})
  )
}

export const fetchProduct = async productId => {
  const {
    data: { product },
  } = await client.query({
    query: FETCH_PRODUCT,
    variables: { productId },
  })
  return product
}
