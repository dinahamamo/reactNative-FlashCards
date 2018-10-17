import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { commonStyles } from '../utils/styles'
import { green } from '../utils/colors'

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
      <TouchableOpacity onPress={() => this.viewDeck(item)} style={styles.card}>
        <Text style={commonStyles.cardHeader}>{decks[item].title}</Text>
        <Text style={commonStyles.cardSubHeader}>({decks[item].questions.length} Cards)</Text>
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
      <View style={[commonStyles.darkBackground, commonStyles.center, {padding: 20}]}>
        {deckKeys.length > 0
          ? <FlatList
              data={deckKeys}
              renderItem={this.renderItem}
              keyExtractor={item => item}
              style={styles.list}/>
          : <Text style={[commonStyles.header, {color: green}]}>No Decks!</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    alignSelf: 'flex-start',
    marginTop: 50,
    width: '100%'
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#1A1B25'
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)