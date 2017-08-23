// @flow

import React, { Component } from 'react'
import { View, StyleSheet, Platform, TabBarIOS } from 'react-native'
import Comments from '../renderers/Comments'
import { withNavigation } from 'react-navigation'
import styles from '../styles'
import Swiper from 'react-native-swiper'
import AndroidToolbar from '../components/AndroidToolbar'
import getNavigation from '../helpers/getNavigation'

// @withNavigation
export default class ProfileScreen extends Component<void, Props, any> {
  renderToolbar() {
    const { user } = this.props.navigation.state.params
    const title = (user && user.username) || 'Contributions'
    return Platform.select({
      android: <AndroidToolbar title={title} navIconName="md-arrow-back" />,
      ios: <TabBarIOS />
    })
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={{ flex: 1 }}>
        {this.renderToolbar()}
        <Comments
          id={navigation.state.params.id}
          {...getNavigation(navigation)}
        />
      </View>
    )
  }
}

const styles2 = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
