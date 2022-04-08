import client from '../client'

import { QUERY_PRODUCTS, QUERY_PRODUCT } from 'graphql/queries'

export const fetchProducts = async () => {
  const {
    data: { categories },
  } = await client.query({ query: QUERY_PRODUCTS })
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
    query: QUERY_PRODUCT,
    variables: { id: productId },
  })
  return product
}
