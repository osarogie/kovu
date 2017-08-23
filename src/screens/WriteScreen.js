// @flow

import React, { Component } from 'react'
import { View, Platform, TabBarIOS } from 'react-native'
// import { withNavigation } from 'react-navigation'
import styles from '../styles'
import AndroidToolbar from '../components/AndroidToolbar'

// @withNavigation
export default class WriteScreen extends Component<void, Props, any> {
  renderToolbar() {
    const title = 'Write'
    return Platform.select({
      android: <AndroidToolbar title={title} navIconName="md-arrow-back" />,
      ios: <TabBarIOS />
    })
  }
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        {this.renderToolbar()}
      </View>
    )
  }
}
