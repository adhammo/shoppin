import { gql } from '@apollo/client'

export const QUERY_CURRENCIES = gql`
  query ListCurrencies {
    currencies {
      label
      symbol
    }
  }
`

export const QUERY_CATEGORIES = gql`
  query ListCategories {
    categories {
      name
    }
  }
`

export const QUERY_CATEGORY = gql`
  query GetCategory($name: String!) {
    category(input: { title: $name }) {
      name
      products {
        id
        category
        name
        brand
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`

export const QUERY_PRODUCTS = gql`
  query ListProducts {
    categories {
      products {
        id
        category
        name
        description
        brand
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`

export const QUERY_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      category
      name
      description
      brand
      gallery
      inStock
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`
