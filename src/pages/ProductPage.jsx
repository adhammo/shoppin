import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import route from 'router/route'
import { resolveStatus } from 'redux/status'
import {
  loadProduct,
  getProductStatus,
  getProduct,
} from 'redux/reducers/productSlice'

import Product from 'components/product/Product'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class ProductPage extends PureComponent {
  componentDidMount() {
    this.props.loadProduct()
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.props.loadProduct()
    }
  }

  render() {
    return resolveStatus(
      () => {
        if (this.props.product) return <Product {...this.props.product} />
        else return <Error message="Product was not found!" />
      },
      () => <Error message="Product failed to load!" />,
      () => <Loading />,
      this.props.productStatus
    )
  }
}

const mapParamsToProps = params => ({
  productId: params.productId,
})

const mapStateToProps = (state, props) => ({
  productStatus: getProductStatus(state),
  product: getProduct(state, props.productId),
})

const mapDispatchToProps = (dispatch, props) => ({
  loadProduct: () => dispatch(loadProduct(props.productId)),
})

export default compose(
  route(mapParamsToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductPage)
