import React, { Component } from 'react'
import { Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Components
import InputField from './InputField'
import TextButton from './TextButton'

import { saveDeckTitle } from '../utils/api'
import { addNewDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: ''
  }

  addDeck = () => {
    const newDeckTitle = this.state.title
    saveDeckTitle(newDeckTitle)
      .then((formatedDeck) => {
        this.props.dispatch(addNewDeck(formatedDeck))
        this.setState(() => ({
          title: ''
        }))
        this.props.navigation.navigate(
          'Deck',
          { deckId: newDeckTitle }
        )
      })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{padding: 40}}>
        <Text>What is the title of your new deck?</Text>
        <InputField value={this.state.title} handleChange={(title) => this.setState({title})}/>
        <TextButton onPress={this.addDeck} isDisabled={this.state.title.length === 0}>
          Add Deck
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck)