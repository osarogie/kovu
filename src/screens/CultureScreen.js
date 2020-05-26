// @flow

import React from 'react'
import { View, StyleSheet, Platform, TabBarIOS } from 'react-native'
import Group from '../renderers/Group'
import Toolbar from '../components/Toolbar'
import getNavigation from '../helpers/getNavigation'

export default class CultureScreen extends React.Component {
  renderToolbar() {
    // const { culture } = this.props.route.params
    // const title = (culture && culture.permalink) || 'Culture'
    const title = 'Blog'

    return <Toolbar title={title} navIconName="md-arrow-back" />
  }

  render() {
    const { navigation, route } = this.props
    // console.log(route.params.id)

    return (
      <View style={{ flex: 1 }}>
        {this.renderToolbar()}
        <Group
          id={route.params.id}
          {...getNavigation(navigation)}
          showGroupInfo={false}
        />
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
