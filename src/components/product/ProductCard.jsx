import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSelectedCurrency } from 'redux/reducers/currenciesSlice'
import { productAdded } from 'redux/reducers/cartSlice'

import styles from 'styles/product/ProductCard.module.css'
import CartIcon from 'icons/cart-light.svg'

class ProductCard extends PureComponent {
  addToCart = () => {
    this.props.addProduct(
      this.props.id,
      this.props.attributes.reduce(
        (attributes, attribute) =>
          attribute.items[0]
            ? { ...attributes, [attribute.id]: attribute.items[0].id }
            : attributes,
        {}
      )
    )
  }

  render() {
    const price = this.props.prices.find(
      price => price.currency.label === this.props.currency.label
    )
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
                this.addToCart()
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

const mapDispatchToProps = dispatch => ({
  addProduct: (id, attributes) => dispatch(productAdded({ id, attributes })),
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
