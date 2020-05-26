import 'react-native-gesture-handler'
import React from 'react'
import { Platform, SafeAreaView } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { Provider as ReduxProvider } from 'react-redux'
import getStore from './store'
import { ThemeProvider } from './providers/ThemeProvider'
import { CustomStatusBar } from './components/CustomStatusBar'
import { ViewerProvider } from './providers/ViewerProvider'
import { RootNavigator } from './navigation/RootNavigator'

enableScreens()

const store = getStore()

const prefix = Platform.select({
  android: 'thecommuntiy://read/',
  ios: 'thecommuntiy://',
})

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ViewerProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <CustomStatusBar />
            <RootNavigator uriPrefix={prefix} />
          </SafeAreaView>
        </ViewerProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
