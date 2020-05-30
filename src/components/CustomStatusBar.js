import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'

export function CustomStatusBar() {
  const { colors, statusBar } = useTheme()

  return (
    <StatusBar
      backgroundColor={colors.background}
      barStyle={statusBar.barStyle}
    />
  )
}
