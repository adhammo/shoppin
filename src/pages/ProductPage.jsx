import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import { resolveStatus } from 'redux/status'
import { getCurrenciesStatus } from 'redux/reducers/currenciesSlice'
import { getProduct, getProductsStatus } from 'redux/reducers/productsSlice'

import Product from 'components/product/Product'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class ProductPage extends PureComponent {
  render() {
    return resolveStatus(
      () => {
        if (this.props.product) return <Product {...this.props.product} />
        else return <Error message="Product was not found!" />
      },
      () => <Error message="Product failed to load!" />,
      () => <Loading />,
      this.props.currenciesStatus,
      this.props.productsStatus
    )
  }
}

const mapParamsToProps = params => ({
  id: params.productId,
})

const mapStateToProps = (state, props) => ({
  currenciesStatus: getCurrenciesStatus(state),
  productsStatus: getProductsStatus(state),
  product: getProduct(state, props.id),
})

export default compose(
  route(mapParamsToProps),
  connect(mapStateToProps)
)(ProductPage)
