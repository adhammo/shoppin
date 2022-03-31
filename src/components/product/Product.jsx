import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sanitize } from 'dompurify'

import { getSelectedCurrency } from 'redux/reducers/currenciesSlice'

import styles from 'styles/product/Product.module.css'
import Attribute from './Attribute'
import classNames from 'classnames'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0,
      sliderCount: 0,
      selectedSlider: 0,
      attributes: {},
    }
    this.galleryRef = createRef()
    this.galleryContainerRef = createRef()
    this.resizeObserver = new ResizeObserver(this.adjustSliderCount)
  }

  isImageSelected = index => {
    return this.state.selectedImage === index
  }

  selectImage = index => {
    this.setState({
      selectedImage: index,
    })
  }

  isSliderSelected = index => {
    return this.state.selectedSlider === index
  }

  selectSlider = index => {
    this.setState({
      selectedSlider: index,
    })
  }

  getAttributeSelected = id => this.state.attributes[id] ?? ''

  getAttributeSelectItem = id => item => {
    this.setState(state => ({
      attributes: {
        ...state.attributes,
        [id]: item,
      },
    }))
  }

  adjustSliderCount = () => {
    const galleryContainer = this.galleryContainerRef.current
    const gallery = this.galleryRef.current
    if (!galleryContainer || !gallery) return

    let ratio = 0
    if (gallery.clientHeight > galleryContainer.clientHeight) {
      ratio = gallery.clientHeight / galleryContainer.clientHeight
    } else if (gallery.clientWidth > galleryContainer.clientWidth) {
      ratio = gallery.clientWidth / galleryContainer.clientWidth
    }

    const count = Math.ceil(ratio)
    if (this.state.sliderCount !== count) {
      this.setState({ sliderCount: count })
    } else {
      this.adjustSliderOffset()
    }
  }

  adjustSliderOffset = () => {
    const galleryContainer = this.galleryContainerRef.current
    const gallery = this.galleryRef.current
    if (!galleryContainer || !gallery) return

    let offset = 0
    if (gallery.clientHeight > galleryContainer.clientHeight) {
      offset = this.state.selectedSlider * galleryContainer.clientHeight
      galleryContainer.scrollTop = offset
    } else if (gallery.clientWidth > galleryContainer.clientWidth) {
      offset = this.state.selectedSlider * galleryContainer.clientWidth
      galleryContainer.scrollLeft = offset
    }
  }

  componentDidMount() {
    const galleryContainer = this.galleryContainerRef.current
    const gallery = this.galleryRef.current
    if (galleryContainer && gallery) {
      this.resizeObserver.observe(galleryContainer)
      this.resizeObserver.observe(gallery)
    }
  }

  componentDidUpdate() {
    this.adjustSliderOffset()
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  render() {
    const price =
      this.props.prices.find(
        price => price.currency.label === this.props.currency.label
      ) ?? this.props.prices[0]
    const title = this.props.name.replace(/ .*/, '')
    const subTitle = this.props.name.match(/ (.*)/)?.[1]
    const selectedImage = this.props.gallery[this.state.selectedImage]
    return (
      <div className={styles.product}>
        <aside
          ref={this.galleryContainerRef}
          className={styles.galleryContainer}
        >
          <div className={styles.slider}>
            {this.state.sliderCount > 1 &&
              (() => {
                let buttons = []
                for (let index = 0; index < this.state.sliderCount; index++) {
                  const selected = this.isSliderSelected(index)
                  buttons = buttons.concat(
                    <button
                      key={index}
                      className={classNames(styles.sliderButton, {
                        [styles.selected]: selected,
                      })}
                      onClick={e => {
                        e.preventDefault()
                        this.selectSlider(index)
                      }}
                      disabled={selected}
                    ></button>
                  )
                }
                return buttons
              })()}
          </div>
          <div ref={this.galleryRef} className={styles.gallery}>
            {this.props.gallery.map((image, index) => {
              const selected = this.isImageSelected(index)
              return (
                <button
                  key={index}
                  className={classNames(styles.galleryImage, {
                    [styles.selected]: selected,
                  })}
                  title={this.props.name}
                  onClick={e => {
                    e.preventDefault()
                    this.selectImage(index)
                  }}
                  disabled={selected}
                >
                  <img
                    className={styles.image}
                    src={image}
                    alt={this.props.name}
                  />
                </button>
              )
            })}
          </div>
        </aside>
        <section className={styles.imageContainer} title={this.props.name}>
          <img
            className={styles.image}
            src={selectedImage}
            alt={this.props.name}
          />
        </section>
        <div className={styles.head}>
          <div className={styles.tags}>
            <span className={styles.tag}>
              {this.props.category.replace(/^\w/, c => c.toUpperCase())}
            </span>
            <span className={styles.tag}>{this.props.brand}</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          {subTitle && <h2 className={styles.subTitle}>{subTitle}</h2>}
        </div>
        <section className={styles.content}>
          {this.props.attributes.map(attribute => (
            <div key={attribute.id} className={styles.attribute}>
              <span className={styles.attributeTitle}>{attribute.name}</span>
              <Attribute
                type={attribute.type}
                items={attribute.items}
                selected={this.getAttributeSelected(attribute.id)}
                selectItem={this.getAttributeSelectItem(attribute.id)}
              />
            </div>
          ))}
          <div className={styles.attribute}>
            <span className={styles.attributeTitle}>PRICE:</span>
            <span className={styles.price}>
              {`${price.currency.symbol}${price.amount}`}
            </span>
          </div>
          <button
            className={classNames(styles.submit, {
              [styles.outStock]: !this.props.inStock,
            })}
            disabled={!this.props.inStock}
          >
            {this.props.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
          </button>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: sanitize(this.props.description),
            }}
          ></div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currency: getSelectedCurrency(state),
})

Product.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  gallery: PropTypes.array.isRequired,
  brand: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Product)
