import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import TextButton from './TextButton'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId
    }
  }

  handleAddCard = () => {
    this.props.navigation.navigate(
      'NewCard',
      { deckId: this.props.deckId}
    )
  }

  handleStartQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.deckId}
    )
  }

  render() {
    const { deckId, deck } = this.props
    return (
      <View style={{padding: 40}}>
        <Text>{deck.title}</Text>
        {deck.questions.length > 0
          ? <Text>{deck.questions.length} cards</Text>
          : <Text>There are no cards in this deck, feel free to add now!</Text>
        }
        <TextButton onPress={this.handleAddCard}>
          Add Card
        </TextButton>
        <TextButton onPress={this.handleStartQuiz} isDisabled={deck.questions.length === 0}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId]
  }

}

export default connect(mapStateToProps)(Deck)