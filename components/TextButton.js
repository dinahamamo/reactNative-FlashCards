import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function SubmitButton({ onPress, children, isDisabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}
