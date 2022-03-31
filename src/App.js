import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'

import {
  getCurrenciesStatus,
  fetchAllCurrencies,
} from './redux/reducers/currenciesSlice'
import {
  getCategoriesStatus,
  fetchAllCategories,
} from './redux/reducers/categoriesSlice'
import {
  getProductsStatus,
  fetchAllProducts,
} from './redux/reducers/productsSlice'

import './App.css'
import Page from './layouts/Page'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      duration: scrollDistanceInPx => 0.6 * Math.abs(scrollDistanceInPx),
      delay: 50,
    })
  }, [pathname])

  return null
}

function App() {
  const dispatch = useDispatch()

  const currenciesStatus = useSelector(getCurrenciesStatus)
  useEffect(() => {
    if (currenciesStatus === 'idle') {
      dispatch(fetchAllCurrencies())
    }
  }, [currenciesStatus, dispatch])

  const categoriesStatus = useSelector(getCategoriesStatus)
  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchAllCategories())
    }
  }, [categoriesStatus, dispatch])

  const productsStatus = useSelector(getProductsStatus)
  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchAllProducts())
    }
  }, [productsStatus, dispatch])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<NotFoundPage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
