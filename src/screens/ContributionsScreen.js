// @flow

import React from 'react'
import { View, StyleSheet, Platform, TabBarIOS } from 'react-native'
import Comments from '../renderers/Comments'
import Toolbar from '../components/Toolbar'
import getNavigation from '../helpers/getNavigation'

export default class ProfileScreen extends React.Component {
  renderToolbar() {
    const { user } = this.props.route.params
    const title = (user && user.username) || 'Contributions'
    return <Toolbar title={title} navIconName="md-arrow-back" />
  }

  render() {
    const { navigation, route } = this.props

    return (
      <View style={{ flex: 1 }}>
        {this.renderToolbar()}
        {/* <KeyboardAvoidingView> */}
        <Comments
          id={route.params.id}
          gid={route.params.discussion.id}
          {...getNavigation(navigation)}
        />
        {/* </KeyboardAvoidingView> */}
      </View>
    )
  }
}

// const styles2 = StyleSheet.create({
//   wrapper: {},
//   slide1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB'
//   },
//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#97CAE5'
//   },
//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#92BBD9'
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold'
//   }
// })
