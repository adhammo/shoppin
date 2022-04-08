import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchProduct } from 'apollo/apis/productAPI'

const initialState = {
  data: {},
  status: 'idle',
  error: null,
}

export const loadProduct = createAsyncThunk(
  'product/loadProduct',
  async productId => await fetchProduct(productId)
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // loadProduct
    builder
      .addCase(loadProduct.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) state.data = action.payload
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default productSlice.reducer

export const getProductStatus = state => state.product.status

export const getProduct = state => state.product.data
