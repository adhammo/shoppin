import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {
  getCurrenciesStatus,
  fetchAllCurrencies,
} from 'redux/reducers/currenciesSlice'
import {
  getCategoriesStatus,
  fetchAllCategories,
} from 'redux/reducers/categoriesSlice'
import {
  getProductsStatus,
  fetchAllProducts,
} from 'redux/reducers/productsSlice'
import { shallRetry } from 'redux/status'

class FetchAtStart extends PureComponent {
  onFetch = () => {
    if (shallRetry(this.props.currenciesStatus)) this.props.fetchCurrencies()
    if (shallRetry(this.props.categoriesStatus)) this.props.fetchCategories()
    if (shallRetry(this.props.productsStatus)) this.props.fetchProducts()
  }

  componentDidMount() {
    this.onFetch()
  }

  componentDidUpdate() {
    this.onFetch()
  }

  render() {
    return <></>
  }
}

const mapStateToProps = state => ({
  currenciesStatus: getCurrenciesStatus(state),
  categoriesStatus: getCategoriesStatus(state),
  productsStatus: getProductsStatus(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCurrencies: () => dispatch(fetchAllCurrencies()),
  fetchCategories: () => dispatch(fetchAllCategories()),
  fetchProducts: () => dispatch(fetchAllProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FetchAtStart)
