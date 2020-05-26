import React from 'react'
import { Button } from 'react-native-paper'

export default function ActivityButton({
  isLoading,
  title,
  onPress,
  mode = 'contained',
}) {
  return (
    <Button loading={isLoading} onPress={onPress} mode={mode}>
      {title}
    </Button>
  )
}
