import { updateObject, createReducer } from './utils'
import config from '@src/config'

function editAppDataPath(firebaseState, action) {
    const appData = Object.assign(firebaseState.appData, { path: action.payload.path })
    return updateObject(firebaseState, { appData })
}

export const initialState = config.states.firebase

export const actions = {
    editAppDataPath: (payload) => ({ 
        type: config.constants.state.firebase.EDIT_APPDATA_PATH, 
        payload 
    })
}

export default createReducer([], {
  EDIT_APPDATA_PATH: editAppDataPath
})
