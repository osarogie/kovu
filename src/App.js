/**
 * @flow
 */

import React from 'react'
import { connect, Provider } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Root } from './navigation'
import { addNavigationHelpers } from 'react-navigation'
import getStore from './store'
import colors from './colors'

const store = getStore()
const mapStateToProps = state => ({
  nav: state.nav,
  night_mode: state.night_mode
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

const Main = connect(mapStateToProps)(({ dispatch, nav, night_mode }) =>
  <View style={{ flex: 1 }}>
    <StatusBar
      backgroundColor={colors.get('statusBar', night_mode)}
      barStyle="light-content"
    />
    <Root
    // navigation={addNavigationHelpers({
    //   dispatch: dispatch,
    //   state: nav
    // })}
    />
  </View>
)
