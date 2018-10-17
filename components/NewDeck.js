import React, { Component } from 'react'
import { Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import InputField from './InputField'
import TextButton from './TextButton'
import { saveDeckTitle } from '../utils/api'
import { addNewDeck } from '../actions'
import { commonStyles } from '../utils/styles'
import { green, pink, white } from '../utils/colors'

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
      <KeyboardAvoidingView
        behavior="padding"
        style={[commonStyles.darkBackground, commonStyles.center, {padding: 15}]}>
        <Text style={[commonStyles.subHeader, {color: green, marginBottom: 40}]}>
          What is the title of your new deck?
        </Text>
        <InputField
          value={this.state.title}
          handleChange={(title) => this.setState({title})}
          marginBottom={40}
          placeholder={'Deck Title'}/>
        <TextButton
          onPress={this.addDeck}
          isDisabled={this.state.title.length === 0}
          borderColor={pink}
          color={pink}>
          Add Deck
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck)