import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchCurrencies } from 'apollo/apis/currencyAPI'

const initialState = {
  data: [],
  selected: '',
  status: 'idle',
  error: null,
}

export const listCurrencies = createAsyncThunk(
  'currencies/listCurrencies',
  async () => await fetchCurrencies()
)

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    currencySelected(state, action) {
      if (action.payload) state.selected = action.payload.label
    },
  },
  extraReducers(builder) {
    // listCurrencies
    builder
      .addCase(listCurrencies.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(listCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.data = action.payload
          state.selected = action.payload[0]?.label ?? ''
        }
      })
      .addCase(listCurrencies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { currencySelected } = currenciesSlice.actions

export default currenciesSlice.reducer

export const getCurrenciesStatus = state => state.currencies.status

export const getCurrencies = state => state.currencies.data

export const isCurrencySelected = (state, currency) => {
  return state.currencies.selected === currency.label
}

export const getSelectedCurrency = state => {
  return state.currencies.data.find(currency =>
    isCurrencySelected(state, currency)
  )
}
