import React, { useState, useContext, createContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider
} from 'react-native-paper'

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#50f',
    accent: '#50f',
    statusBar: '#3902a7',
    text: '#000',
    grayBackground: '#f9f9f9'
  },
  statusBar: {
    barStyle: 'light-content'
  }
}

const darkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: '#05f',
    accent: '#05f',
    statusBar: '#000',
    text: '#fff',
    grayBackground: '#333'
  },
  statusBar: {
    barStyle: 'light-content'
  }
}

const themes = {
  light: lightTheme,
  dark: darkTheme,
  black: null
}

const defaultValue = {
  theme: lightTheme,
  themeControl: {
    changeTheme() {},
    selectedTheme: 'light'
  }
}

const ThemeContext = createContext(defaultValue)

export function ThemeProvider({ children }) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    loadTheme()
    console.log('Load Theme')
  }, [1])

  async function loadTheme() {
    let selectedTheme = await AsyncStorage.getItem('theme')

    setValue({
      theme: themes[selectedTheme] || lightTheme,
      themeControl: {
        changeTheme(themeName) {
          setValue(themeName)
        },
        selectedTheme: selectedTheme || 'light'
      }
    })
  }

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={value.theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext).theme
}

export function useThemeControl() {
  return useContext(ThemeContext).themeControl
}

export function withTheme(Component) {
  function WithTheme(props) {
    const context = useContext(ThemeContext)
    return <Component {...context} {...props} />
  }

  WithTheme.displayName = `WithTheme(${Component.displayName})`

  return WithTheme
}
