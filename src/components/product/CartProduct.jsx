import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { getSelectedCurrency } from 'redux/reducers/currenciesSlice'
import { productChanged, productRemoved } from 'redux/reducers/cartSlice'
import { capitalize } from 'util/stringOps'

import styles from 'styles/product/CartProduct.module.css'
import Attribute from './Attribute'
import ArrowIcon from 'icons/arrow.svg'
import PlusIcon from 'icons/plus.svg'
import MinusIcon from 'icons/minus.svg'
// import DeleteIcon from 'icons/delete.svg'
import { ReactComponent as DeleteIcon } from 'icons/delete.svg'

class CartProduct extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { selectedImage: 0 }
  }

  isImageFirst = () => {
    return this.state.selectedImage === 0
  }

  isImageLast = () => {
    return this.state.selectedImage === this.props.gallery.length - 1
  }

  prevImage = () => {
    if (this.isImageFirst()) return
    this.setState(state => ({
      selectedImage: state.selectedImage - 1,
    }))
  }

  nextImage = () => {
    if (this.isImageLast()) return
    this.setState(state => ({
      selectedImage: state.selectedImage + 1,
    }))
  }

  isUnity = () => {
    return this.props.option.count === 1
  }

  increment = () => {
    this.props.changeProduct(this.props.id, this.props.optionIndex, 1)
  }

  decrement = () => {
    this.props.changeProduct(this.props.id, this.props.optionIndex, -1)
  }

  remove = () => {
    this.props.removeProduct(this.props.id, this.props.optionIndex)
  }

  render() {
    const price =
      this.props.prices.find(
        price => price.currency.label === this.props.currency.label
      ) ?? this.props.prices[0]
    const total = price.amount * this.props.option.count
    const selectedImage = this.props.gallery[this.state.selectedImage]
    const prevDisabled = this.isImageFirst()
    const nextDisabled = this.isImageLast()
    const subDisabled = this.isUnity()
    return (
      <div className={styles.cartProduct}>
        <header className={styles.head}>
          <div className={styles.tags}>
            <span className={styles.tag}>
              {capitalize(this.props.category)}
            </span>
          </div>
          <h1 className={styles.brand}>{this.props.brand}</h1>
          <h2 className={styles.name}>{this.props.name}</h2>
        </header>
        <section className={styles.gallery}>
          <button
            className={classNames(styles.navButton, styles.prev, {
              [styles.disabled]: prevDisabled,
            })}
            title="Previous image"
            onClick={e => {
              e.preventDefault()
              this.prevImage()
            }}
            disabled={prevDisabled}
          >
            <img className={styles.arrow} src={ArrowIcon} alt="Arrow Icon" />
          </button>
          <div className={styles.imageContainer} title={this.props.name}>
            <img
              className={styles.image}
              src={selectedImage}
              alt={this.props.name}
            />
          </div>
          <button
            className={classNames(styles.navButton, styles.next, {
              [styles.disabled]: nextDisabled,
            })}
            title="Next image"
            onClick={e => {
              e.preventDefault()
              this.nextImage()
            }}
            disabled={nextDisabled}
          >
            <img className={styles.arrow} src={ArrowIcon} alt="Arrow Icon" />
          </button>
        </section>
        <section className={styles.option}>
          <button
            className={classNames(styles.optionButton, styles.add)}
            title="Add one"
            onClick={e => {
              e.preventDefault()
              this.increment()
            }}
          >
            <img className={styles.plus} src={PlusIcon} alt="Plus Icon" />
          </button>
          <span className={styles.count}>{this.props.option.count}</span>
          <button
            className={classNames(styles.optionButton, styles.sub, {
              [styles.disabled]: subDisabled,
            })}
            title="Subtract one"
            onClick={e => {
              e.preventDefault()
              this.decrement()
            }}
            disabled={subDisabled}
          >
            <img className={styles.minus} src={MinusIcon} alt="Minus Icon" />
          </button>
        </section>
        <section className={styles.attributes}>
          <div className={styles.attribute}>
            <span className={styles.attributeTitle}>TOTAL:</span>
            <span className={styles.price}>
              {`${price.currency.symbol}${Math.round(total * 100) / 100}`}
            </span>
          </div>
          {this.props.attributes.map(attribute => (
            <div key={attribute.id} className={styles.attribute}>
              <span className={styles.attributeTitle}>
                {`${attribute.name.toUpperCase()}:`}
              </span>
              <Attribute
                small
                type={attribute.type}
                items={attribute.items}
                selected={this.props.option[attribute.id]}
              />
            </div>
          ))}
        </section>
        <button
          className={classNames(styles.deleteButton)}
          title="Remove"
          onClick={e => {
            e.preventDefault()
            this.remove()
          }}
        >
          <DeleteIcon className={styles.delete} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: getSelectedCurrency(state),
})

const mapDispatchToProps = dispatch => ({
  changeProduct: (id, index, count) =>
    dispatch(productChanged({ id, index, count })),
  removeProduct: (id, index) => dispatch(productRemoved({ id, index })),
})

CartProduct.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gallery: PropTypes.array.isRequired,
  brand: PropTypes.string.isRequired,
  prices: PropTypes.array.isRequired,
  option: PropTypes.object.isRequired,
  optionIndex: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)
