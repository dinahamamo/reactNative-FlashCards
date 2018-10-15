import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Components
import InputField from './InputField'
import SubmitButton from './SubmitButton'

import { getDecks } from '../utils/helpers'
import { submitNewDeck } from '../utils/api'
import { addNewDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: '',
    questions: []
  }

  addDeck = () => {
    const key = this.state.title
    const newDeck = this.state
    submitNewDeck({ key, newDeck })
      .then((formatedDeck) => {
        this.props.dispatch(addNewDeck(formatedDeck))
        this.setState(() => ({
          title: ''
        }))
        // Navigate To Deck page
      })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{padding: 40}}>
        <Text>What is the title of your new deck?</Text>
        <InputField value={this.state.title} handleChange={(title) => this.setState({title})}/>
        <SubmitButton component={'Deck'} onPress={this.addDeck} isDisabled={this.state.title.length === 0}/>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck)