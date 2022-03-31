import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import client from './apollo/client'
import store from './redux/store'
import reportWebVitals from './reportWebVitals'

import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
