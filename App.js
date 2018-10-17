import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { black, green, pink, darkGray } from './utils/colors'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import reducer from './reducers'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/newCard'
import Quiz from './components/Quiz'

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="cards" size={25} color={tintColor} />
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={25} color={tintColor} />
      }
    }
  }, {
    tabBarOptions: {
      activeTintColor: pink,
      style: {
        height: 56,
        backgroundColor: darkGray,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
        title: 'Go Back'
      }
    },
    Deck: {
      screen: Deck,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: black
        }
      }
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        headerTintColor: green,
        title: 'Add Question',
        headerStyle: {
          backgroundColor: black
        }
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: black
        }
      }
    }
  }
)
const store = createStore(reducer)
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={black} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>

    );
  }
}

