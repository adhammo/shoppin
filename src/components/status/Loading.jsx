import React, { PureComponent } from 'react'

import styles from 'styles/status/Loading.module.css'

class Loading extends PureComponent {
  render() {
    return (
      <div className={styles.loading} title="Loading">
        <div className={styles.spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className={styles.message}>Loading...</p>
      </div>
    )
  }
}

export default Loading
