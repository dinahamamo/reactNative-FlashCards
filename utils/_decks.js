export const DECKS_STORAGE_KEY = 'FlashCards:decks'

export function formatDeck(deckTitle, questions) {
  return {
    [deckTitle]: {
      title: deckTitle,
      questions: questions ? questions : []
    }
  }
}