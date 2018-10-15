import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import NewDeck from './components/NewDeck'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <NewDeck />
        </View>
      </Provider>

    );
  }
}

