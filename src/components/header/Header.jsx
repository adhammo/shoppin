import React, { PureComponent } from 'react'

import styles from 'styles/header/Header.module.css'
import Navigation from './Navigation'
import Logo from './Logo'
import Actions from './Actions'

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <Navigation />
        <Logo />
        <Actions />
      </div>
    )
  }
}

export default Header
