import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { listCurrencies } from 'apollo/apis/currenciesAPI'

const initialState = {
  data: [],
  selected: '',
  status: 'idle',
  error: null,
}

export const fetchAllCurrencies = createAsyncThunk(
  'currencies/fetchAllCurrencies',
  async () => await listCurrencies()
)

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    currencySelected: {
      reducer(state, action) {
        if (action.payload) state.selected = action.payload
      },
      prepare(currency) {
        return {
          payload: currency.label,
        }
      },
    },
  },
  extraReducers(builder) {
    // fetchAllCurrencies
    builder
      .addCase(fetchAllCurrencies.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.data = state.data.concat(action.payload)
          state.selected = action.payload[0]?.label ?? ''
        }
      })
      .addCase(fetchAllCurrencies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { currencySelected } = currenciesSlice.actions

export default currenciesSlice.reducer

export const getCurrenciesStatus = state => state.currencies.status

export const getAllCurrencies = state => state.currencies.data

export const isCurrencySelected = (state, currency) => {
  return state.currencies.selected === currency.label
}

export const getSelectedCurrency = state => {
  return state.currencies.data.find(currency =>
    isCurrencySelected(state, currency)
  )
}
