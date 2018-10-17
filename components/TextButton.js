import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function SubmitButton({ onPress, children, isDisabled, backgroundColor, color, borderColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.button, {backgroundColor: backgroundColor, borderColor: borderColor}]}>
      <Text style={[styles.text, {color: color}]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderRadius: 5,
    borderWidth: 2,
    padding: 15,
    marginBottom: 15
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
})
