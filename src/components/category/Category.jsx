import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCartProducts } from 'redux/reducers/cartSlice'
import { getProduct } from 'redux/reducers/productsSlice'
import { capitalize } from 'util/stringOps'

import styles from 'styles/category/Category.module.css'
import ProductCard from 'components/product/ProductCard.jsx'

class Category extends PureComponent {
  render() {
    return (
      <div className={styles.category}>
        <header className={styles.header}>
          <h1 className={styles.title}>{capitalize(this.props.name)}</h1>
        </header>
        <section className={styles.products}>
          {this.props.products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              inCart={Boolean(this.props.cartProducts[product.id])}
            />
          ))}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  cartProducts: getCartProducts(state),
  products: props.productsIds.map(productId => getProduct(state, productId)),
})

Category.propTypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Category)
