import AsyncStorage from '@callstack/async-storage'

export default {
    async init () {
        // the following line resets storage -- for debugging
        // AsyncStorage.clear()

        let appState = await AsyncStorage.getItem('appState')
        console.log('got appState from storage', appState)
        return appState? JSON.parse(appState): appState
    },

    saveAppState (payload) {
        console.log('saving appState', payload)
        AsyncStorage.setItem('appState', JSON.stringify(payload))
    }
}