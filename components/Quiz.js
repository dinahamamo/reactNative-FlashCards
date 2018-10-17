import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import TextButton from './TextButton'
import { commonStyles } from '../utils/styles'
import { pink, black, green, white } from '../utils/colors'

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
    <View style={styles.wrapper}>
      <Text style={[commonStyles.cardSubHeader, {marginBottom: 10}]}>
        {index + 1} / {deck.questions.length}
      </Text>
      <Text style={[commonStyles.cardHeader, {marginBottom: 40}]}>
        {deck.questions[index].question}
      </Text>
      <TextButton
        onPress={this.toggleShowAnswer}
        color={white}
        backgroundColor={'transparent'}
        borderColor={'transparent'}>
        Show Answer
      </TextButton>
    </View>
  )

  renderAnswer = (index, deck) => (
    <View style={styles.wrapper}>
      <Text style={[commonStyles.cardSubHeader, {marginBottom: 10}]}>
        {index + 1} / {deck.questions.length}
      </Text>
      <Text style={[commonStyles.cardHeader, {marginBottom: 40}]}>
        {deck.questions[index].answer}
      </Text>
      <TextButton
        onPress={this.toggleShowAnswer}
        color={white}
        backgroundColor={'transparent'}
        borderColor={'transparent'}
        >
        Show Question
      </TextButton>
      <TextButton
        onPress={() => this.incrementAnswers('correctAnswers')}
        color={black}
        backgroundColor={green}
        borderColor={green}
        >
        Correct
      </TextButton>
      <TextButton
        onPress={() => this.incrementAnswers('incorrectAnswers')}
        color={white}
        backgroundColor={pink}
        borderColor={pink}>
        Incorrect
      </TextButton>
    </View>
  )

  renderScore = () => {
    clearLocalNotification()
      .then(setLocalNotification())
    return (
      <View style={styles.wrapper}>
        <Text style={[commonStyles.cardSubHeader, {marginBottom: 5}]}>
          Correct Answers: {this.state.correctAnswers}
        </Text>
        <Text style={[commonStyles.cardSubHeader, {marginBottom: 5}]}>
          Incorrect Answers: {this.state.incorrectAnswers}
        </Text>
        <Text style={[commonStyles.cardHeader, {marginBottom: 40}]}>
          Total Score: {(this.state.correctAnswers / this.props.deck.questions.length * 100).toFixed()}%
        </Text>
        <TextButton
          onPress={this.reset}
          color={green}
          borderColor={green}>
          Take it again!
        </TextButton>
        <TextButton
          onPress={() => this.props.navigation.navigate('Deck', { deckId: this.props.deckId })}
          color={black}
          backgroundColor={green}
          borderColor={green}>
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
      <View style={[commonStyles.darkBackground, {padding: 30, flex: 1}]}>
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

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

function mapStateToProps(state, {navigation}) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)