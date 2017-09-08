import React from 'react'
import AndroidToolbar from './AndroidToolbar'
import { Platform, TabBarIOS } from 'react-native'
import { ViewPropTypes } from 'react-native'

export default class Toolbar extends React.Component {
  render() {
    return Platform.select({
      android: <AndroidToolbar {...this.props} />,
      ios: <TabBarIOS />
    })
  }
}

Toolbar.defaultProps = {
  style: {}
}

Toolbar.propTypes = {
  ...ViewPropTypes,
  style: React.PropTypes.any
}
