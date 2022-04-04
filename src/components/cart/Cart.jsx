import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getProduct } from 'redux/reducers/productsSlice'

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
          {this.props.cartProducts.map(cartProduct => {
            const product = this.props.products[cartProduct.id]
            return cartProduct.options.map((option, index) => (
              <CartProduct
                key={`${cartProduct.id}_${index}`}
                {...product}
                option={option}
                optionIndex={index}
              />
            ))
          })}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  products: props.cartProducts.reduce(
    (products, cartProduct) => ({
      ...products,
      [cartProduct.id]: getProduct(state, cartProduct.id),
    }),
    {}
  ),
})

Cart.propTypes = {
  cartProducts: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Cart)
