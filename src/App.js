import React from 'react'
import { Platform } from 'react-native'
import { useScreens } from 'react-native-screens'
import { Provider as ReduxProvider } from 'react-redux'
import getStore from './store'
import { AppContainer } from './navigation/AppContainer'
import { ThemeProvider } from './providers/ThemeProvider'
import { CustomStatusBar } from './components/CustomStatusBar'
import { ViewerProvider } from './providers/ViewerProvider'

useScreens()

const store = getStore()

const prefix = Platform.select({
  android: 'thecommuntiy://read/',
  ios: 'thecommuntiy://'
})

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ViewerProvider>
          <>
            <CustomStatusBar />
            <AppContainer uriPrefix={prefix} />
          </>
        </ViewerProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
