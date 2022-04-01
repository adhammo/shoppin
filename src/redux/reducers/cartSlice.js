import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: {},
}

const isExactOption = (option, attributes) => {
  return Object.entries(attributes).every(([id, item]) => item === option[id])
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    productAdded(state, action) {
      const { id, attributes } = action.payload
      const newOption = {
        ...attributes,
        amount: 1,
      }
      if (state.products[id]) {
        const index = state.products[id].findIndex(option =>
          isExactOption(option, attributes)
        )
        if (index !== -1) state.products[id][index].amount++
        else state.products[id] = state.products[id].concat(newOption)
      } else state.products[id] = [newOption]
    },
  },
})

// const cart = {
//   'huarache-x-stussy-le': [
//     {
//       Size: '40',
//       amount: 1,
//     },
//   ],
// }

// const product = {
//   id: 'huarache-x-stussy-le',
//   attributes: {
//     Size: '40',
//   },
// }

export const { productAdded } = cartSlice.actions

export default cartSlice.reducer

export const getCartProducts = state => {
  return Object.entries(state.cart.products).map(([id, options]) => ({
    id,
    options,
  }))
}

// export const getProduct = (state, productId) => {
//   return state.products.data.find(product => product.id === productId)
// }
