import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { resolveStatus } from 'redux/status'
import { getCartProductsArray } from 'redux/reducers/cartSlice'
import { getProductsStatus } from 'redux/reducers/productsSlice'

import Cart from 'components/cart/Cart'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class CartPage extends PureComponent {
  render() {
    return resolveStatus(
      () => <Cart cartProducts={this.props.cartProducts} />,
      () => <Error />,
      () => <Loading />,
      this.props.productsStatus
    )
  }
}

const mapStateToProps = state => ({
  productsStatus: getProductsStatus(state),
  cartProducts: getCartProductsArray(state),
})

export default connect(mapStateToProps)(CartPage)
