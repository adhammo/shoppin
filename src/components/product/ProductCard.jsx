import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { getSelectedCurrency } from 'redux/reducers/currenciesSlice'

import styles from 'styles/product/ProductCard.module.css'
import CartIcon from 'icons/cart-light.svg'

class ProductCard extends PureComponent {
  render() {
    const price = this.props.prices.find(
      price => price.currency.label === this.props.currency.label
    )
    const selected = this.props.inCart
    return (
      <Link
        className={classNames(styles.productCard, {
          [styles.selected]: selected,
        })}
        to={`/product/${this.props.id}`}
      >
        <section
          className={styles.imageContainer}
          title={this.props.name.concat(
            !this.props.inStock ? ' - Out of stock' : ''
          )}
        >
          <img
            className={styles.image}
            src={this.props.gallery[0]}
            alt={this.props.name}
          />
          {!this.props.inStock && (
            <div className={styles.outStockContainer}>
              <span className={styles.outStock}>OUT OF STOCK</span>
            </div>
          )}
          {selected && (
            <div className={styles.cartIcon} title="Check cart">
              <img className={styles.icon} src={CartIcon} alt="Cart Icon" />
            </div>
          )}
        </section>
        <footer className={styles.content}>
          <div className={styles.head}>
            <h3 className={styles.title}>
              {`${this.props.brand} ${this.props.name}`}
            </h3>
          </div>
          <span className={styles.price}>
            {`${price.currency.symbol}${Math.round(price.amount * 100) / 100}`}
          </span>
        </footer>
      </Link>
    )
  }
}

const mapStateToProps = state => ({
  currency: getSelectedCurrency(state),
})

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  gallery: PropTypes.array.isRequired,
  brand: PropTypes.string.isRequired,
  prices: PropTypes.array.isRequired,
  inCart: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(ProductCard)
