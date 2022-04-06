import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from 'styles/header/Logo.module.css'
import LogoIcon from 'icons/logo.svg'

class Logo extends PureComponent {
  render() {
    return (
      <div className={styles.logo}>
        <Link className={styles.link} to="/" title="Logo">
          <img className={styles.icon} src={LogoIcon} alt="Logo Icon" />
        </Link>
      </div>
    )
  }
}

export default Logo
