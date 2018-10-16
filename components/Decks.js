import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class Decks extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    getDecks()
      .then(decks => this.props.dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ item }) => {
    const { decks } = this.props
    return (
      <TouchableOpacity onPress={() => this.viewDeck(item)}>
        <Text>{decks[item].title}</Text>
        <Text>{decks[item].questions.length} Cards</Text>
      </TouchableOpacity>
    )
  }

  viewDeck = (deckId) => {
    this.props.navigation.navigate(
      'Deck',
      { deckId }
    )
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state
    const deckKeys = Object.keys(decks)

    if ( ready === false ) {
      return <AppLoading />
    }

    return(
      <View style={{padding: 40, flex: 1}}>
        {deckKeys.length > 0
          ? <FlatList data={deckKeys} renderItem={this.renderItem} />
          : <Text>No Decks!</Text>}
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)