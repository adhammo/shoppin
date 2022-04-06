import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: {},
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
      const { id, attributes } = action.payload
      const newOption = {
        ...attributes,
        count: 1,
      }
      if (state.products[id]) {
        const index = state.products[id].findIndex(option =>
          isExactOption(option, attributes)
        )
        if (index !== -1) state.products[id][index].count++
        else state.products[id] = state.products[id].concat(newOption)
      } else state.products[id] = [newOption]
    },
    productChanged(state, action) {
      const { id, index, count } = action.payload
      const option = state.products[id]?.[index]
      if (option) {
        state.products[id][index].count = Math.max(0, option.count + count)
      }
    },
    productRemoved(state, action) {
      const { id, index } = action.payload
      const option = state.products[id]?.[index]
      if (option) {
        if (Object.keys(state.products[id]).length === 1) {
          delete state.products[id]
        } else state.products[id].splice(index, 1)
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

export const getCartProducts = state => state.cart.products

export const getCartProductsArray = state => {
  return Object.entries(state.cart.products).map(([id, options]) => ({
    id,
    options,
  }))
}

export const isOverlayVisible = state => state.cart.overlayVisible
