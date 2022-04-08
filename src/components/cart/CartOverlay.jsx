import React, { PureComponent, createRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { hasSucceeded } from 'redux/status'
import {
  getCurrenciesStatus,
  getSelectedCurrency,
} from 'redux/reducers/currenciesSlice'
import {
  overlayChanged,
  isOverlayVisible,
  getCartProductsArray,
} from 'redux/reducers/cartSlice'

import styles from 'styles/cart/CartOverlay.module.css'
import CartProductTiny from 'components/product/CartProductTiny'
import CartIcon from 'icons/cart.svg'

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
    const count = this.props.cartProducts.reduce((count, cartProduct) => {
      return (
        count +
        cartProduct.options.reduce((amount, option) => amount + option.count, 0)
      )
    }, 0)
    let priceText = ''
    if (hasSucceeded(this.props.currenciesStatus)) {
      const total = this.props.cartProducts.reduce((total, cartProduct) => {
        const product = cartProduct.product
        const price = product.prices.find(
          price => price.currency.label === this.props.selectedCurrency.label
        )
        return (
          total +
          cartProduct.options.reduce(
            (amount, option) => amount + price.amount * option.count,
            0
          )
        )
      }, 0)
      priceText = `${this.props.selectedCurrency.symbol}${
        Math.round(total * 100) / 100
      }`
    }
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
                  const product = cartProduct.product
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
                <span className={styles.total}>{priceText}</span>
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
  overlayVisible: isOverlayVisible(state),
  currenciesStatus: getCurrenciesStatus(state),
  selectedCurrency: getSelectedCurrency(state),
  cartProducts: getCartProductsArray(state),
})

const mapDispatchToProps = dispatch => ({
  showOverlay: visible => dispatch(overlayChanged({ visible })),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
