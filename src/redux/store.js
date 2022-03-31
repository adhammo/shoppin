import { configureStore } from '@reduxjs/toolkit'

import currenciesReducer from './reducers/currenciesSlice'
import categoriesReducer from './reducers/categoriesSlice'
import productsReducer from './reducers/productsSlice'

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
})
