import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { gray, white } from '../utils/colors'

export default function InputField({ handleChange, value, placeholder, marginBottom }) {
  return (
    <TextInput
      style={[styles.input, {marginBottom: marginBottom}]}
      onChangeText={handleChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={gray}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    paddingRight: 10,
    paddingLeft: 10,
    color: white
  }
})