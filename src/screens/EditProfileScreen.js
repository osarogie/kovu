// @flow

import React from 'react'
import { View, StyleSheet, Platform, TabBarIOS } from 'react-native'
import EditUser from '../renderers/EditUser'
import { withNavigation } from 'react-navigation'
import styles from '../styles'
import Toolbar from '../components/Toolbar'
import getNavigation from '../helpers/getNavigation'

export default class EditProfileScreen extends React.Component {
  renderToolbar() {
    const title = 'Edit profile'
    return Platform.select({
      android: <Toolbar title={title} navIconName="md-arrow-back" />,
      ios: <TabBarIOS />
    })
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={{ flex: 1 }}>
        {this.renderToolbar()}
        <EditUser {...getNavigation(navigation)} />
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
