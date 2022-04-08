import { configureStore } from '@reduxjs/toolkit'

import currenciesReducer from './reducers/currenciesSlice'
import categoriesReducer from './reducers/categoriesSlice'
import categoryReducer from './reducers/categorySlice'
import productReducer from './reducers/productSlice'
import cartReducer from './reducers/cartSlice'

export default configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
})
