import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import { Router, Switch, Route } from './routing'

import store from './store'

import Home from './Controllers/Home'

export default class App extends React.Component {
  render () {
    return (
      <StoreProvider store={store}>
      <PaperProvider>
        <View style={styles.app}>
          <Router>
            <Route exact path="/" render={props => <Home {...props} />} />
          </Router>
        </View>
      </PaperProvider>
    </StoreProvider>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    flex:1
  }
})