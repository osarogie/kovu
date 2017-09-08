/**
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'
import { StatusBar, Platform, View } from 'react-native'
import { Root } from './navigation'
import { addNavigationHelpers } from 'react-navigation'
import getStore from './store'
import colors from './colors'

const store = getStore()

export default class App extends React.Component {
  render() {
    const prefix = Platform.select({
      android: 'thecommuntiy://read/',
      ios: 'thecommuntiy://'
    })
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={colors.get('statusBar')}
            barStyle="light-content"
          />
          <Root
            uriPrefix={prefix}
            // navigation={addNavigationHelpers({
            //   dispatch: this.props.dispatch,
            //   state: this.props.nav
            // })}
          />
        </View>
      </Provider>
    )
  }
}
