import React from 'react'
import { useNavigation } from '@react-navigation/core'

export function withNavigation(Component) {
  function WithNavigation(props) {
    const navigation = useNavigation()
    return <Component navigation={navigation} {...props} />
  }

  WithNavigation.displayName = `WithNavigation(${Component.name ||
    Component.displayName})`

  return WithNavigation
}
