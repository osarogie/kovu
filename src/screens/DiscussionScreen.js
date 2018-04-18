// @flow

import React from 'react'
import { View, Platform, TabBarIOS } from 'react-native'
import Post from '../renderers/Post'
import { withNavigation } from 'react-navigation'
import styles from '../styles'
import getNavigation from '../helpers/getNavigation'

export default class DiscussionScreen extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Post id={navigation.state.params.id} {...getNavigation(navigation)} />
      </View>
    )
  }
}
