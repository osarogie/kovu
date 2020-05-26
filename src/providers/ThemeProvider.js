import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

const lightTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#50f',
    accent: '#50f',
    statusBar: '#fff',
    text: '#000',
    grayBackground: '#f9f9f9',
    separator: '#ddd',
  },
  statusBar: {
    barStyle: 'dark-content',
  },
}

const darkTheme = {
  ...DarkTheme,
  roundness: 5,
  colors: {
    ...DarkTheme.colors,
    primary: '#fff',
    accent: '#05f',
    statusBar: '#000',
    text: '#fff',
    grayBackground: '#333',
    separator: '#444',
  },
  statusBar: {
    barStyle: 'light-content',
  },
}

const themes = {
  light: lightTheme,
  dark: darkTheme,
  black: null,
}

const defaultValue = {
  theme: lightTheme,
  themeControl: {
    changeTheme() {},
    selectedTheme: 'light',
  },
}

const ThemeContext = createContext(defaultValue)

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme()
  const value = useMemo(
    () => ({ theme: themes[colorScheme] || lightTheme, colorScheme }),
    [colorScheme],
  )

  return (
    <AppearanceProvider>
      <ThemeContext.Provider value={value}>
        <PaperProvider theme={value.theme}>{children}</PaperProvider>
      </ThemeContext.Provider>
    </AppearanceProvider>
  )
}

export function useTheme() {
  return useContext(ThemeContext).theme
}

export function withTheme(Component) {
  function WithTheme(props) {
    const context = useContext(ThemeContext)
    return <Component {...context} {...props} />
  }

  WithTheme.displayName = `WithTheme(${Component.displayName})`

  return WithTheme
}
