import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'

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
          <Outlet />
        </main>
      </div>
    )
  }
}

export default Page
