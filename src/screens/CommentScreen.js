// @flow

import React from 'react'
import { View, Platform, TabBarIOS } from 'react-native'
import styles from '../styles'
import Editor from '../components/Editor'
import PostThumb from '../fragments/PostThumb'

export default class CommentScreen extends React.Component {
  render() {
    const { discussion } = this.props.route.params

    return (
      <View style={styles.container}>
        <PostThumb discussion={discussion} />
        <Editor culture={culture} ref={e => (this.editor = e)} />
      </View>
    )
  }
}
