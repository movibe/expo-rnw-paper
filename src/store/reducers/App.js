import { updateObject, createReducer } from './utils'
import config from '@src/config'

function setAppData (appState, action) {

    return updateObject(appState, action.payload)
}

export const initialState = config.states.app

export const actions = {
    setAppData: (payload) => ({ 
        type: config.constants.state.app.SET_APPDATA, 
        payload 
    })
}

export default createReducer([], {
  SET_APP_NOTIFICATIONS: setAppData
})
