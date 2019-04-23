// @flow

import React from 'react'
import { View } from 'react-native'
import styles from '../styles'
import Editor from '../components/Editor'
import getNavigation from '../helpers/getNavigation'

export default class WriteScreen extends React.Component {
  render() {
    // const { culture } = this.props.navigation.state.params
    const { params } = this.props.navigation.state
    var culture = null
    var id = null
    var editing_mode = null

    if (params) {
      culture = params.culture
      id = params.id
      editing_mode = params.editing_mode
    }

    return (
      <View style={styles.container}>
        {/* {this.renderToolbar()} */}
        <Editor
          culture={culture}
          // ref={e => (this.editor = e)}
          editing_mode={editing_mode}
          id={id}
          {...getNavigation(this.props.navigation)}
        />
      </View>
    )
  }
}
