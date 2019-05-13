import React from 'react'
import { Provider } from 'react-redux'
import {
  StatusBar,
  Platform,
  View,
  StyleSheet,
  UIManager,
  Text
} from 'react-native'
import { Root } from './navigation'
import { addNavigationHelpers } from 'react-navigation'
import getStore from './store'
import colors from './colors'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { COLOR, ThemeContext } from 'react-native-material-ui'
import { PURPLE } from './ui'
import { connect } from 'react-redux'
import { useScreens } from 'react-native-screens'
import { ViewerProvider } from './services/viewerService'

useScreens()

const store = getStore()

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#05f',
    accent: '#05f'
  }
}

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: '#fff',
    secondaryColor: '#000',
    accentColor: '#000',

    primaryTextColor: '#000',
    secondaryTextColor: '#000',
    alternateTextColor: '#000'
  },
  toolbar: {
    container: {
      height: 50
    }
  }
}

const darkTheme = {
  palette: {
    primaryColor: '#000',
    secondaryColor: '#fff',
    accentColor: '#fff',

    primaryTextColor: '#fff',
    secondaryTextColor: '#fff',
    alternateTextColor: '#fff'
  },
  toolbar: {
    container: {
      height: 50
    }
  }
}

export default class App extends React.Component {
  // constructor(props) {
  //   super(props)

  //   if (Platform.OS === 'android') {
  //     UIManager.setLayoutAnimationEnabledExperimental &&
  //       UIManager.setLayoutAnimationEnabledExperimental(true)
  //   }
  // }
  render() {
    const prefix = Platform.select({
      android: 'thecommuntiy://read/',
      ios: 'thecommuntiy://'
    })
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <ViewerProvider>
            <ConnectedTheme>
              <View style={styles.view}>
                <StatusBar
                  // backgroundColor={colors.get("statusBar")}
                  backgroundColor="#000"
                  // barStyle="light-content"
                />
                <Root
                  uriPrefix={prefix}
                  // navigation={addNavigationHelpers({
                  //   dispatch: this.props.dispatch,
                  //   state: this.props.nav
                  // })}
                />
              </View>
            </ConnectedTheme>
          </ViewerProvider>
        </Provider>
      </PaperProvider>
    )
  }
}

const ConnectedTheme = connect(state => ({ dark: state.night_mode }))(
  ({ dark, children }) => (
    <ThemeContext.Provider uiTheme={dark ? darkTheme : uiTheme}>
      {children}
    </ThemeContext.Provider>
  )
)

ConnectedTheme.displayName = 'Connect(ThemeProvider)'

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: Platform.select({
      android: 0,
      ios: 20
    })
  }
})
