import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import { getProduct, getProductsStatus } from 'redux/reducers/productsSlice'

import Product from 'components/product/Product'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class ProductPage extends PureComponent {
  render() {
    if (this.props.status === 'succeeded') {
      if (this.props.product) return <Product {...this.props.product} />
      else return <Error />
    } else if (this.props.status === 'failed') {
      return <Error />
    } else {
      return <Loading />
    }
  }
}

const mapParamsToProps = params => ({
  id: params.productId,
})

const mapStateToProps = (state, props) => ({
  status: getProductsStatus(state),
  product: getProduct(state, props.id),
})

export default compose(
  route(mapParamsToProps),
  connect(mapStateToProps)
)(ProductPage)
