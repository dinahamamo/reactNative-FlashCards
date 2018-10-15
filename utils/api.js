import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'

export const submitNewDeck = async ({ key, newDeck }) => {
  const formatedDeck = {[key]: newDeck}
  try {
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(formatedDeck))
    return formatedDeck
  } catch (error) {
    console.warn('Error adding new deck: ', error)
  }
}

export function getAllDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}