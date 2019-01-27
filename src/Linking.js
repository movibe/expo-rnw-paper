import { Linking, Alert } from 'react-native'
import cloneDeep from 'lodash.clonedeep'
import Url from 'url'

import config from '@src/config'
import store from '@src/store'
import { actions } from '@src/store/reducers/App'

import AsyncStorage from '@src/AsyncStorage'

export default {
    /** on iOS, request contection details by url */
    requestConnectionDetails () {
        let urlize = uri => `bbn://register?appname=third-party-demo&callback=${uri}?action=${config.constants.urls.connectionDetails}`

        console.info('opening', urlize('expo'))
        Linking.getInitialURL().then(uri => {
            Linking.openURL(urlize(uri)).catch((error) => {
                console.warn(error)

                Alert.alert(
                    'Notice',
                    'Behavior-based-notifications is not installed'
                )
            })
        })
        .catch(err => {
            console.warn('Linking error', err)
        })
    },

    /** this will only happen on iOS */
    onOpen (url) {
        console.log('onOpen url ', url)

        const parseQuery = true
        const resource = Url.parse(url, parseQuery)
        if(!resource.query) {
            console.warn('Linking error - unknown url', url)
            return
        }

        switch (resource.query.action) {
            case config.constants.urls.connectionDetails:
                onConnectionDetails(resource.query)
                return
            default:
                console.warn('Linking error - unknown url', url)
        }
    }
}

function onConnectionDetails (query) {
    // console.log('success', query)

    let appState = cloneDeep(store.getState().App)

    const notifications = {
        deviceToken: query.token,
        bundleid: query.bundle
    }

    appState = Object.assign({}, appState, notifications)

    store.dispatch(actions.setAppData(appState))

    AsyncStorage.saveAppState(appState)
}