import React, { PureComponent } from 'react'

import styles from 'styles/header/Actions.module.css'
import Currency from 'components/header/Currency'
import CartOverlay from 'components/cart/CartOverlay'

class Actions extends PureComponent {
  render() {
    return (
      <div className={styles.actions}>
        <Currency />
        <CartOverlay />
      </div>
    )
  }
}

export default Actions
