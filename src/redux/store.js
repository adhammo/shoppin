import { configureStore } from '@reduxjs/toolkit'

import currenciesReducer from './reducers/currenciesSlice'
import categoriesReducer from './reducers/categoriesSlice'
import productsReducer from './reducers/productsSlice'
import cartReducer from './reducers/cartSlice'

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
})
