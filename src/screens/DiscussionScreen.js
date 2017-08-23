// @flow

import React, { Component } from 'react'
import { View, Platform, TabBarIOS } from 'react-native'
import Post from '../renderers/Post'
import { withNavigation } from 'react-navigation'
import styles from '../styles'
import AndroidToolbar from '../components/AndroidToolbar'
import getNavigation from '../helpers/getNavigation'

export default class DiscussionScreen extends Component<void, Props, any> {
  renderToolbar() {
    const { discussion } = this.props.navigation.state.params
    const title = 'Story'
    // const subtitle =
    //   (discussion && { subtitle: `by ${discussion.user.name}` }) || {}

    return Platform.select({
      android: (
        <AndroidToolbar
          title={title}
          // {...subtitle}
          navIconName="md-arrow-back"
        />
      ),
      ios: <TabBarIOS />
    })
  }
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <Post id={navigation.state.params.id} {...getNavigation(navigation)} />
      </View>
    )
  }
}
