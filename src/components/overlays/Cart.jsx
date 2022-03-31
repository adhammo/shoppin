import React, { Component } from 'react'

import styles from 'styles/overlays/Cart.module.css'
import CartIcon from 'icons/cart.svg'

class Cart extends Component {
  render() {
    return (
      <div>
        <button className={styles.cart} title="Cart">
          <img className={styles.icon} src={CartIcon} alt="Cart Icon" />
        </button>
      </div>
    )
  }
}

export default Cart
