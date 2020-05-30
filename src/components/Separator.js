import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function Separator({ style }) {
  const { colors } = useTheme()
  return (
    <View style={[{ backgroundColor: colors.separator, height: 1 }, style]} />
  )
}
