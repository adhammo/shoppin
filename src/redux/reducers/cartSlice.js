import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartProducts: {},
  overlayVisible: false,
}

const isExactOption = (option, attributes) => {
  return Object.entries(attributes).every(([id, item]) => item === option[id])
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    productAdded(state, action) {
      const { product, attributes } = action.payload
      const id = product.id
      const newOption = {
        ...attributes,
        count: 1,
      }
      if (state.cartProducts[id]) {
        const index = state.cartProducts[id].options.findIndex(option =>
          isExactOption(option, attributes)
        )
        if (index !== -1) {
          state.cartProducts[id].options[index].count++
        } else {
          state.cartProducts[id].options =
            state.cartProducts[id].options.concat(newOption)
        }
      } else {
        state.cartProducts[id] = { product, options: [newOption] }
      }
    },
    productChanged(state, action) {
      const { id, index, count } = action.payload
      const option = state.cartProducts[id]?.options[index]
      if (option) {
        state.cartProducts[id].options[index].count = Math.max(
          0,
          option.count + count
        )
      }
    },
    productRemoved(state, action) {
      const { id, index } = action.payload
      const option = state.cartProducts[id]?.options[index]
      if (option) {
        if (Object.keys(state.cartProducts[id].options).length === 1) {
          delete state.cartProducts[id]
        } else state.cartProducts[id].options.splice(index, 1)
      }
    },
    overlayChanged(state, action) {
      state.overlayVisible = action.payload.visible
    },
  },
})

export const { productAdded, productChanged, productRemoved, overlayChanged } =
  cartSlice.actions

export default cartSlice.reducer

export const getCartProducts = state => state.cart.cartProducts

export const getCartProductsArray = state => {
  return Object.entries(state.cart.cartProducts).map(([id, cartProduct]) => ({
    id,
    ...cartProduct,
  }))
}

export const isOverlayVisible = state => state.cart.overlayVisible
