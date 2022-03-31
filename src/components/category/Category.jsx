import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getProduct, getProductsStatus } from 'redux/reducers/productsSlice'

import styles from 'styles/category/Category.module.css'
import ProductCard from 'components/product/ProductCard.jsx'

class Category extends PureComponent {
  render() {
    return (
      <div className={styles.category}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {this.props.name.replace(/^\w/, c => c.toUpperCase())}
          </h1>
        </header>
        <section className={styles.products}>
          {this.props.status === 'succeeded' &&
            this.props.products.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  status: getProductsStatus(state),
  products: props.productsIds.map(productId => getProduct(state, productId)),
})

Category.propTypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Category)
