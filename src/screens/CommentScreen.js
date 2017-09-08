// @flow

import React, { Component } from 'react'
import { View, Platform, TabBarIOS } from 'react-native'
import styles from '../styles'
import Editor from '../components/Editor'
import PostThumb from '../fragments/PostThumb'

export default class CommentScreen extends Component<void, Props, any> {
  render() {
    const { discussion } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <PostThumb discussion={discussion} />
        <Editor culture={culture} ref={e => (this.editor = e)} />
      </View>
    )
  }
}
