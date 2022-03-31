import React, { PureComponent } from 'react'

import styles from 'styles/status/Error.module.css'
import ErrorIcon from 'icons/error.svg'

class Error extends PureComponent {
  render() {
    return (
      <div className={styles.error} title="Error">
        <img className={styles.icon} src={ErrorIcon} alt="Error Icon" />
      </div>
    )
  }
}

export default Error
