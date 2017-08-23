import React from 'react'
import AndroidToolbar from './AndroidToolbar'
import { Platform, TabBarIOS } from 'react-native'

export default (Toolbar = props =>
  Platform.select({
    android: <AndroidToolbar {...props} />,
    ios: <TabBarIOS />
  }))
