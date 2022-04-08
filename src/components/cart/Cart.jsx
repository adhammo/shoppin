import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/cart/Cart.module.css'
import CartProduct from 'components/product/CartProduct'

class Cart extends PureComponent {
  render() {
    return (
      <div className={styles.cart}>
        <header className={styles.header}>
          <h1 className={styles.title}>CART</h1>
        </header>
        <section className={styles.cartProducts}>
          {this.props.cartProducts.length > 0 ? (
            this.props.cartProducts.map(cartProduct => {
              const product = cartProduct.product
              return cartProduct.options.map((option, index) => (
                <CartProduct
                  key={`${cartProduct.id}_${index}`}
                  {...product}
                  option={option}
                  optionIndex={index}
                />
              ))
            })
          ) : (
            <p className={styles.empty}>Cart is empty, add some items.</p>
          )}
        </section>
      </div>
    )
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.array.isRequired,
}

export default Cart
