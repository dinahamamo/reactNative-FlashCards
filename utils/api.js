import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDeck } from './helpers'

export const saveDeckTitle = async (deckTitle) => {
  const formatedDeck = formatDeck(deckTitle)
  try {
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(formatedDeck))
    return formatedDeck
  } catch (error) {
    console.warn('Error adding new deck: ', error)
  }
}

export const getDecks = async (id) => {
  try {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then (data => {
        const decks = JSON.parse(data)
        return typeof id === 'undefined'
        ? decks
        : decks[id]
      })
  } catch (error) {
    console.warn('Error getting decks: ', error)
  }
}

export const addCardToDeck = async (deckTitle, newCard) => {
    try { AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then(data => {
        const decks = JSON.parse(data)
        const updatedQuestions = decks[deckTitle].questions.concat([newCard])
        const formatedDeck = formatDeck(deckTitle, updatedQuestions)
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(formatedDeck))
        return formatedDeck
      })
    } catch ( error ) {
      console.warn('Error adding card: ', error)
    }
}