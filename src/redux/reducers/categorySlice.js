import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchCategory } from 'apollo/apis/categoryAPI'

const initialState = {
  data: {},
  status: 'idle',
  error: null,
}

export const loadCategory = createAsyncThunk(
  'category/loadCategory',
  async categoryName => await fetchCategory(categoryName)
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // loadCategory
    builder
      .addCase(loadCategory.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loadCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) state.data = action.payload
      })
      .addCase(loadCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default categorySlice.reducer

export const getCategoryStatus = state => state.category.status

export const getCategory = state => state.category.data
