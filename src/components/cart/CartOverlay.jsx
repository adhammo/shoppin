import React, { PureComponent, createRef } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { hasSucceeded } from 'redux/status'
import {
  getCartProductsArray,
  isOverlayVisible,
  overlayChanged,
} from 'redux/reducers/cartSlice'
import { getSelectedCurrency } from 'redux/reducers/currenciesSlice'
import { getProductsStatus, getProduct } from 'redux/reducers/productsSlice'

import styles from 'styles/cart/CartOverlay.module.css'
import CartProductTiny from 'components/product/CartProductTiny'
import CartIcon from 'icons/cart.svg'
import { Link } from 'react-router-dom'

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props)
    this.buttonRef = createRef()
    this.overlayRef = createRef()
  }

  openOverlay = () => {
    this.props.showOverlay(true)
  }

  closeOverlay = () => {
    this.props.showOverlay(false)
  }

  toggleOverlay = e => {
    e.preventDefault()
    if (!this.props.overlayVisible) this.openOverlay()
    else this.closeOverlay()
  }

  hasClickedOutside = e => {
    const clickedInside =
      this.overlayRef.current?.contains(e.target) ||
      this.buttonRef.current?.contains(e.target)
    if (!clickedInside) this.closeOverlay()
  }

  componentDidMount() {
    if (this.props.overlayVisible) {
      document.addEventListener('mousedown', this.hasClickedOutside)
    }
  }

  componentDidUpdate() {
    if (this.props.overlayVisible) {
      document.addEventListener('mousedown', this.hasClickedOutside)
    } else {
      document.removeEventListener('mousedown', this.hasClickedOutside)
    }
  }

  componentWillUnmount() {
    if (this.props.overlayVisible) {
      document.removeEventListener('mousedown', this.hasClickedOutside)
    }
  }

  render() {
    if (!hasSucceeded(this.props.status)) return <div></div>
    const count = this.props.cartProducts.reduce((count, cartProduct) => {
      return (
        count +
        cartProduct.options.reduce((amount, option) => amount + option.count, 0)
      )
    }, 0)
    const total = this.props.cartProducts.reduce((total, cartProduct) => {
      const product = this.props.products[cartProduct.id]
      const price = product.prices.find(
        price => price.currency.label === this.props.currency.label
      )
      return (
        total +
        cartProduct.options.reduce(
          (amount, option) => amount + price.amount * option.count,
          0
        )
      )
    }, 0)
    return (
      <div className={styles.cart}>
        <button
          ref={this.buttonRef}
          className={classNames(styles.button, {
            [styles.active]: this.props.overlayVisible,
          })}
          onClick={this.toggleOverlay}
          title="Cart"
        >
          <img className={styles.cartIcon} src={CartIcon} alt="Cart Icon" />
          {count > 0 && <span className={styles.buttonCount}>{count}</span>}
        </button>
        {this.props.overlayVisible && (
          <div ref={this.overlayRef} className={styles.overlay}>
            <header className={styles.header}>
              <h1 className={styles.title}>
                <span>My Bag</span>
                <span className={styles.count}>{`, ${
                  count || 'no'
                } items`}</span>
              </h1>
            </header>
            <section className={styles.cartProducts}>
              {this.props.cartProducts.length > 0 ? (
                this.props.cartProducts.map(cartProduct => {
                  const product = this.props.products[cartProduct.id]
                  return cartProduct.options.map((option, index) => (
                    <CartProductTiny
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
            <footer className={styles.footer}>
              <div className={styles.totalContainer}>
                <span className={styles.totalHeader}>Total</span>
                <span className={styles.total}>
                  {`${this.props.currency.symbol}${
                    Math.round(total * 100) / 100
                  }`}
                </span>
              </div>
              <div className={styles.buttons}>
                <Link className={styles.bag} to="/cart">
                  VIEW BAG
                </Link>
                <button
                  className={classNames(styles.checkButton)}
                  onClick={e => {
                    e.preventDefault()
                    alert('Checking out is not implemented!')
                  }}
                >
                  CHECK OUT
                </button>
              </div>
            </footer>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: getProductsStatus(state),
  overlayVisible: isOverlayVisible(state),
  currency: getSelectedCurrency(state),
  cartProducts: getCartProductsArray(state),
  products: getCartProductsArray(state).reduce(
    (products, cartProduct) => ({
      ...products,
      [cartProduct.id]: getProduct(state, cartProduct.id),
    }),
    {}
  ),
})

const mapDispatchToProps = dispatch => ({
  showOverlay: visible => dispatch(overlayChanged({ visible })),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
