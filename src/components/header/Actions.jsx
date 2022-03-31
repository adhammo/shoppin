import React, { PureComponent } from 'react'

import styles from 'styles/header/Actions.module.css'
import Currency from 'components/overlays/Currency'
import Cart from 'components/overlays/Cart'

class Actions extends PureComponent {
  render() {
    return (
      <div className={styles.actions}>
        <Currency />
        <Cart />
      </div>
    )
  }
}

export default Actions
