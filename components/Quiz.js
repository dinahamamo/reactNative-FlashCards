import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import TextButton from './TextButton'

class Quiz extends Component {
  state = {
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0,
    incorrectAnswers: 0
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `${deckId} Quiz`
     }
  }

  renderQuestion = (index, deck) => (
    <View>
      <Text>{index + 1} / {deck.questions.length}</Text>
      <Text>{deck.questions[index].question}</Text>
      <TextButton onPress={this.toggleShowAnswer}>
        Show Answer
      </TextButton>
    </View>
  )

  renderAnswer = (index, deck) => (
    <View>
      <Text>{deck.questions[index].answer}</Text>
      <TextButton onPress={this.toggleShowAnswer}>
        Show Question
      </TextButton>
      <TextButton onPress={() => this.incrementAnswers('correctAnswers')} >
        Correct
      </TextButton>
      <TextButton onPress={() => this.incrementAnswers('incorrectAnswers')} >
        Incorrect
      </TextButton>
    </View>
  )

  renderScore = () => {
    clearLocalNotification()
      .then(setLocalNotification())
    return (
      <View>
        <Text>Correct Answers: {this.state.correctAnswers}</Text>
        <Text>Incorrect Answers: {this.state.incorrectAnswers}</Text>
        <Text>Total Score: {(this.state.correctAnswers / this.props.deck.questions.length * 100).toFixed(2)}%</Text>
        <TextButton onPress={this.reset} >
          Take it again!
        </TextButton>
        <TextButton onPress={() => this.props.navigation.navigate('Deck', { deckId: this.props.deckId })} >
          Back To Deck
        </TextButton>
      </View>
    )
  }
  incrementAnswers = (key) => {
    this.toggleShowAnswer()
    this.setState((state) => ({
      ...state,
      [key]: state[key] + 1,
      questionIndex: state.questionIndex + 1
    }))
  }

  toggleShowAnswer = () => {
    this.setState((state) => ({
      ...state,
      showAnswer: !state.showAnswer
    }))
  }

  reset = () => {
    this.setState(() => ({
      questionIndex: 0,
      showAnswer: false,
      correctAnswers: 0,
      incorrectAnswers: 0
    }))
  }

  render() {
    const { deck } = this.props
    const { questionIndex, showAnswer } = this.state
    return (
      <View>
        { showAnswer === false
          ?  questionIndex < deck.questions.length
            ? this.renderQuestion(questionIndex, deck)
            : this.renderScore()
          : this.renderAnswer(questionIndex, deck)
        }
      </View>
    )
  }
}

function mapStateToProps(state, {navigation}) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)