import { StyleSheet } from 'react-native'
import { black, green, pink } from './colors'

export const commonStyles = StyleSheet.create({
  darkBackground: {
    backgroundColor: black
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  header: {
    fontSize: 50,
    fontWeight: '700'
  },
  subHeader: {
    fontSize: 40,
    textAlign: 'center'
  },
  cardHeader: {
    color: green,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 8
  },
  cardSubHeader: {
    color: pink,
    fontSize: 16,
    textAlign: 'center'
  }
})