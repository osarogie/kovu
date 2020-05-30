import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function EmptyList({ message = 'Nothing to see here' }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
      }}>
      <Text>{message}</Text>
    </View>
  )
}
