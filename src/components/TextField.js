import React from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export const TextField = React.forwardRef(
  ({ onChangeText, value, label, ...props }, ref) => {
    return (
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        ref={ref}
        {...props}
        style={[styles.input, props.style]}
      />
    )
  }
)

const styles = StyleSheet.create({
  input: {}
})
