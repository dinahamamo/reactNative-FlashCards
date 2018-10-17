import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import InputField from './InputField'
import TextButton from './TextButton'
import { addCardToDeck } from '../utils/api'
import { addNewCard } from '../actions'
import { commonStyles } from '../utils/styles'
import { green, pink, black } from '../utils/colors'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId
    }
  }


  addCard = () => {
    const { deckId } = this.props
    const newCard = this.state
    addCardToDeck(deckId, newCard)
      .then(() => {
        this.props.dispatch(addNewCard(deckId, newCard))
        this.setState(() => ({
          question: '',
          answer: ''
        }))
        this.props.navigation.navigate(
          'Deck',
          { deckId: deckId }
        )
      })
  }
  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={[commonStyles.darkBackground, commonStyles.center, {padding: 15}]}>
        <Text style={styles.title}>Add Your New Card!</Text>
        <InputField
          value={question}
          handleChange={(question) => this.setState({question})}
          placeholder={'What is your question?'}
          marginBottom={15}/>
        <InputField
          value={answer}
          handleChange={(answer) => this.setState({answer})}
          placeholder={'Answer'}
          marginBottom={30}/>
        <TextButton
          onPress={this.addCard}
          isDisabled={question === 0 || answer.length === 0}
          backgroundColor={green}
          color={black}
          borderColor={green}>
          Add Card
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
    color: pink,
    fontSize: 30
  }
})

function mapStateToProps(stat, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId
  }
}

export default connect(mapStateToProps)(NewCard)