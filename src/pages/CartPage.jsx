import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getCartProductsArray } from 'redux/reducers/cartSlice'

import Cart from 'components/cart/Cart'

class CartPage extends PureComponent {
  render() {
    return <Cart cartProducts={this.props.cartProducts} />
  }
}

const mapStateToProps = state => ({
  cartProducts: getCartProductsArray(state),
})

export default connect(mapStateToProps)(CartPage)
