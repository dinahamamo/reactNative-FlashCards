import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function SubmitButton({ onPress, component, isDisabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <Text>Add {component}</Text>
    </TouchableOpacity>
  )
}
