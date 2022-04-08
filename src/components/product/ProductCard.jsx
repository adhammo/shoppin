import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { hasSucceeded } from 'redux/status'
import {
  getCurrenciesStatus,
  getSelectedCurrency,
} from 'redux/reducers/currenciesSlice'
import { productAdded } from 'redux/reducers/cartSlice'

import styles from 'styles/product/ProductCard.module.css'
import CartIcon from 'icons/cart-light.svg'

class ProductCard extends PureComponent {
  render() {
    let priceText = ''
    if (hasSucceeded(this.props.currenciesStatus)) {
      const price = this.props.prices.find(
        price => price.currency.label === this.props.selectedCurrency.label
      )
      priceText = `${price.currency.symbol}${
        Math.round(price.amount * 100) / 100
      }`
    }
    return (
      <Link className={styles.productCard} to={`/product/${this.props.id}`}>
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
          {this.props.inStock && (
            <button
              className={styles.cartButton}
              title="Add to cart"
              onClick={e => {
                e.preventDefault()
                this.props.addProductToCart()
              }}
            >
              <img className={styles.icon} src={CartIcon} alt="Cart Icon" />
            </button>
          )}
        </section>
        <footer className={styles.content}>
          <div className={styles.head}>
            <h3 className={styles.title}>
              {`${this.props.brand} ${this.props.name}`}
            </h3>
          </div>
          <span className={styles.price}>{priceText}</span>
        </footer>
      </Link>
    )
  }
}

const mapStateToProps = state => ({
  currenciesStatus: getCurrenciesStatus(state),
  selectedCurrency: getSelectedCurrency(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  addProductToCart: () => {
    return dispatch(
      productAdded({
        id: props.id,
        product: {
          id: props.id,
          name: props.name,
          gallery: props.gallery,
          brand: props.brand,
          attributes: props.attributes,
          prices: props.prices,
          category: props.category,
        },
        attributes: props.attributes.reduce(
          (attributes, attribute) =>
            attribute.items[0]
              ? { ...attributes, [attribute.id]: attribute.items[0].id }
              : attributes,
          {}
        ),
      })
    )
  },
})

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  gallery: PropTypes.array.isRequired,
  brand: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
