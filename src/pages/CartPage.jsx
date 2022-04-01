import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getCartProducts } from 'redux/reducers/cartSlice'
import { getProductsStatus } from 'redux/reducers/productsSlice'

import Cart from 'components/cart/Cart'
import Loading from 'components/status/Loading'
import Error from 'components/status/Error'

class CartPage extends PureComponent {
  render() {
    if (this.props.status === 'succeeded') {
      return <Cart cartProducts={this.props.cartProducts} />
    } else if (this.props.status === 'failed') {
      return <Error />
    } else {
      return <Loading />
    }
  }
}

const mapStateToProps = state => ({
  status: getProductsStatus(state),
  cartProducts: getCartProducts(state),
})

export default connect(mapStateToProps)(CartPage)
