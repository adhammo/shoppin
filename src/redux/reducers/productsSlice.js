import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { listProducts } from 'apollo/apis/productsAPI'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => await listProducts()
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetchAllProducts
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.data = state.data.concat(action.payload)
        }
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer

export const getProductsStatus = state => state.products.status

export const getAllProducts = state => state.products.data

export const getProduct = (state, productId) => {
  return state.products.data.find(product => product.id === productId)
}
