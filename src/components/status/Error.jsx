import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/status/Error.module.css'
import ErrorIcon from 'icons/error.svg'

class Error extends PureComponent {
  render() {
    return (
      <div className={styles.error} title="Error">
        <img className={styles.icon} src={ErrorIcon} alt="Error Icon" />
        <p className={styles.message}>{this.props.message}</p>
      </div>
    )
  }
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Error
