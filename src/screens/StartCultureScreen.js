// @flow

import React from 'react'
import { View, StyleSheet, Platform, TabBarIOS } from 'react-native'
import StartCulture from '../renderers/StartCulture'
import { withNavigation } from 'react-navigation'
import styles from '../styles'
import Toolbar from '../components/Toolbar'
import getNavigation from '../helpers/getNavigation'

export default class StartCultureScreen extends React.Component {
  renderToolbar() {
    const title = 'Culture Form'
    return <Toolbar title={title} navIconName="md-arrow-back" />
  }

  render() {
    const { navigation } = this.props
    const { params } = this.props.navigation.state
    var id = null
    var editing_mode = null

    if (params) {
      id = params.id
      editing_mode = params.editing_mode
    }

    return (
      <View style={{ flex: 1 }}>
        {/* {this.renderToolbar()} */}
        <StartCulture
          editing_mode={editing_mode}
          id={id}
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
