import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { isOverlayVisible } from 'redux/reducers/cartSlice'

import styles from 'styles/layouts/Page.module.css'
import Header from 'components/header/Header'

class Page extends PureComponent {
  render() {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.main}>
          {this.props.overlayVisible && <div className={styles.screen}></div>}
          <Outlet />
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  overlayVisible: isOverlayVisible(state),
})

export default connect(mapStateToProps)(Page)
