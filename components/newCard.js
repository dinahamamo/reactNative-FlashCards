import React, { Component } from 'react'
import { Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import InputField from './InputField'
import TextButton from './TextButton'

import { addCardToDeck } from '../utils/api'
import { addNewCard } from '../actions'

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
      <KeyboardAvoidingView>
        <InputField value={question} handleChange={(question) => this.setState({question})}/>
        <InputField value={answer} handleChange={(answer) => this.setState({answer})}/>
        <TextButton onPress={this.addCard} isDisabled={question === 0 || answer.length === 0}>
          Add Card
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId
  }
}

export default connect(mapStateToProps)(NewCard)