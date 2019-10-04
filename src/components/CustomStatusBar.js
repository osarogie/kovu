import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { useTheme } from '../providers/ThemeProvider'

export function CustomStatusBar() {
  const { colors, statusBar } = useTheme()

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={colors.statusBar}
        barStyle={statusBar.barStyle}
      />
      <View style={[styles.statusBar, { backgroundColor: colors.statusBar }]} />
    </>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight
  }
})
