import React from 'react'
import { Toolbar as OldToolbar } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

// @withNavigation
export default class Appbar extends React.Component {
  render() {
    return (
      <OldToolbar
        // leftElement="arrow-back"
        // onLeftElementPress={this.props.navigation.goBack}
        // centerElement="Ikeja Electric"
        // rightElement="menu"
        // onRightElementPress={() =>
        //   this.props.navigation.navigate('DrawerToggle')
        // }
        {...this.props}
      />
    )
  }
}
Appbar=withNavigation(Appbar)