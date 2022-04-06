import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import client from './apollo/client'
import store from './redux/store'

import './App.css'
import FetchAtStart from 'components/effects/FetchAtStart'
import ScrollToTop from 'components/effects/ScrollToTop'
import Page from './layouts/Page'
import HomePage from 'pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from 'pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <FetchAtStart />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Page />}>
              <Route index element={<HomePage />} />
              <Route path="category/:categoryName" element={<CategoryPage />} />
              <Route path="product/:productId" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  )
}

export default App
