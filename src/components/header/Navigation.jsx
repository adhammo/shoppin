import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { hasSucceeded } from 'redux/status'
import {
  listCategories,
  getCategoriesStatus,
  getCategories,
} from 'redux/reducers/categoriesSlice'
import { capitalize } from 'util/stringOps'

import styles from 'styles/header/Navigation.module.css'

class Navigation extends PureComponent {
  componentDidMount() {
    this.props.listCategories()
  }

  render() {
    if (!hasSucceeded(this.props.categoriesStatus)) return <nav></nav>
    return (
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {this.props.categories.map(category => (
            <li key={category.name} className={styles.item}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.link, { [styles.active]: isActive })
                }
                to={`/category/${category.name}`}
              >
                {capitalize(category.name)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  categoriesStatus: getCategoriesStatus(state),
  categories: getCategories(state),
})

const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(listCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
