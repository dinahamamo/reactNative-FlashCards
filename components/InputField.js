import React from 'react'
import { TextInput } from 'react-native'

export default function InputField({ handleChange, value }) {
  return (
    <TextInput
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={handleChange}
      value={value}
    />
  )
}