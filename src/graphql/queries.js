import { gql } from '@apollo/client'

export const LIST_CURRENCIES = gql`
  query ListCurrencies {
    currencies {
      label
      symbol
    }
  }
`

export const LIST_CATEGORIES = gql`
  query ListCategories {
    categories {
      name
      products {
        id
      }
    }
  }
`

export const FETCH_CATEGORY = gql`
  query GetCategory($name: String!) {
    category(input: { title: $name }) {
      name
      products {
        id
      }
    }
  }
`

export const LIST_PRODUCTS = gql`
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

export const FETCH_PRODUCT = gql`
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
