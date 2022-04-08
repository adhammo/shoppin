import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchCategories } from 'apollo/apis/categoryAPI'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const listCategories = createAsyncThunk(
  'categories/listCategories',
  async () => await fetchCategories()
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // listCategories
    builder
      .addCase(listCategories.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) state.data = action.payload
      })
      .addCase(listCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default categoriesSlice.reducer

export const getCategoriesStatus = state => state.categories.status

export const getCategories = state => state.categories.data
