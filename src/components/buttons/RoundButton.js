import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, DefaultTheme } from 'react-native-paper'

const buttonTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#50f',
    accent: '#05f'
  }
}

export function RoundButton({ children, onPress, style, ...props }) {
  return (
    <Button
      style={[styles.buttonStyle, style]}
      onPress={onPress}
      contentStyle={styles.textStyle}
      theme={buttonTheme}
      {...props}
    >
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 300,
    height: 50,
    margin: 8,
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center'
  },

  textStyle: {
    color: '#fff',
    fontSize: 20
  }
})
