import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import classNames from 'classnames'

import { getSelectedCurrency } from 'redux/reducers/currenciesSlice'
import { capitalize } from 'util/stringOps'

import styles from 'styles/product/CartProduct.module.css'
import Attribute from './Attribute'

class CartProduct extends PureComponent {
  render() {
    const price =
      this.props.prices.find(
        price => price.currency.label === this.props.currency.label
      ) ?? this.props.prices[0]
    return (
      <div className={styles.cartProduct}>
        <div className={styles.head}>
          <div className={styles.tags}>
            <span className={styles.tag}>
              {capitalize(this.props.category)}
            </span>
          </div>
          <h1 className={styles.brand}>{this.props.brand}</h1>
          <h2 className={styles.name}>{this.props.name}</h2>
          <span className={styles.price}>
            {`${price.currency.symbol}${price.amount}`}
          </span>
        </div>
        <section className={styles.attributes}>
          {this.props.attributes.map(attribute => (
            <>
              <span
                key={`${attribute.id}_title`}
                className={styles.attributeTitle}
              >
                {`${attribute.name.toUpperCase()}:`}
              </span>
              <Attribute
                key={`${attribute.id}_attribute`}
                type={attribute.type}
                items={attribute.items}
                selected={this.props.option[attribute.id]}
              />
            </>
          ))}
        </section>
        <section className={styles.imageContainer} title={this.props.name}>
          <img
            className={styles.image}
            src={this.props.gallery[0]}
            alt={this.props.name}
          />
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: getSelectedCurrency(state),
})

CartProduct.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gallery: PropTypes.array.isRequired,
  brand: PropTypes.string.isRequired,
  prices: PropTypes.array.isRequired,
  option: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(CartProduct)
