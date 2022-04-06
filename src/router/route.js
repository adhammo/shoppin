import React, { forwardRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'

function route(mapParamsToProps) {
  return function (Component) {
    const RoutedComponent = (props, ref) => {
      const params = useParams()
      const path = useLocation()
      return (
        <Component
          {...props}
          {...mapParamsToProps(params, path, props)}
          ref={ref}
        />
      )
    }
    const componentName = Component.displayName || Component.name || 'Component'
    RoutedComponent.displayName = `Route(${componentName})`
    RoutedComponent.WrappedComponent = Component
    return forwardRef(RoutedComponent)
  }
}

export default route
