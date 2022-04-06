import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import { resolveStatus } from 'redux/status'
import { getCurrenciesStatus } from 'redux/reducers/currenciesSlice'
import {
  getCategoriesStatus,
  getCategory,
} from 'redux/reducers/categoriesSlice'
import { getProductsStatus } from 'redux/reducers/productsSlice'

import Category from 'components/category/Category'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class CategoryPage extends PureComponent {
  render() {
    return resolveStatus(
      () => {
        if (this.props.category) return <Category {...this.props.category} />
        else return <Error message="Category was not found!" />
      },
      () => <Error message="Category failed to load!" />,
      () => <Loading />,
      this.props.currenciesStatus,
      this.props.categoriesStatus,
      this.props.productsStatus
    )
  }
}

const mapParamsToProps = params => ({
  name: params.categoryName,
})

const mapStateToProps = (state, props) => ({
  currenciesStatus: getCurrenciesStatus(state),
  categoriesStatus: getCategoriesStatus(state),
  productsStatus: getProductsStatus(state),
  category: getCategory(state, props.name),
})

export default compose(
  route(mapParamsToProps),
  connect(mapStateToProps)
)(CategoryPage)
