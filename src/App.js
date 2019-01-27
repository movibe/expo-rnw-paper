import React from 'react'
import { StyleSheet, View, Platform, Linking } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import { Router, Switch, Route } from './routing'

import AsyncStorage from '@src/AsyncStorage'
import { default as AppLinking } from '@src/Linking'
import store from '@src/store'
import { actions as appActions } from '@src/store/reducers/App'
import config from '@src/config'

import Home from '@src/Controllers/Home'
import Splash from '@src/Controllers/Splash'

let unsubscribe

export default class App extends React.Component {
  state = {
    isLoaded: false,
    splashMessage: 'loading...'
  }
  
  async componentDidMount () {
    if(!this.isValidAppState()) { // first, verify we don't already have the data
      let self = this
      let appState = await AsyncStorage.init()
      if (appState) {
        console.log('appState', appState)

        store.dispatch(appActions.setAppData(appState))

        self.validateAppData(appState)
        self.setState({ isLoaded: true })  
      } else {
        if(Platform.OS === 'ios') {
          Linking.getInitialURL()
          .then(url => {
              AppLinking.onOpen(url)

              self.validateAppData()
              self.setState({ isLoaded: true })      
          })
          .catch(err => {
              console.warn('Linking error', err)
          })  
        } else {
          this.validateAppData()
        }
      }
    }

    if(Platform.OS === 'ios')
      Linking.addListener('url', e => {
          AppLinking.onOpen(e.url)
      })
  }

  render () {
    return (
      <StoreProvider store={store}>
      <PaperProvider>
        <View style={styles.app}>
          <Router>
            <Route exact path="/" render={props => (this.state.isLoaded || true) 
              ? <Home />
              : <Splash onValidAppData={() => this.setState({ isLoaded: true })} message={this.state.splashMessage} />} 
            />
          </Router>
        </View>
      </PaperProvider>
    </StoreProvider>
    )
  }

  async validateAppData (app=store.getState().App) {
    if(!this.isValidAppState(app)) {
      await this.getValidData()
    }
  }

  isValidAppState (app=store.getState().App) {
    return app.deviceToken && app.bundleid
  }

  async getValidData () {
    if(Platform.OS !== 'ios') {
      this.setState({ splashMessage: config.constants.messages.IOS_TOKEN_UNAVAILABLE })
    } else {
      await AppLinking.requestConnectionDetails()
    }
  }
}

const styles = StyleSheet.create({
  app: {
    flex:1
  }
})
