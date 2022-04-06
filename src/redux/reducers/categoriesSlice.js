import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { listCategories } from 'apollo/apis/categoriesAPI'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async () => await listCategories()
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetchAllCategories
    builder
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.data = state.data.concat(action.payload)
        }
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default categoriesSlice.reducer

export const getCategoriesStatus = state => state.categories.status

export const getAllCategories = state => state.categories.data

export const getCategory = (state, categoryName) => {
  return state.categories.data.find(category => category.name === categoryName)
}
