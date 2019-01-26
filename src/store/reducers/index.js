import { combineReducers } from 'redux'

import { default as Firebase, initialState as FirebaseInitialState } from './Firebase'

export const initialStates = { Firebase: FirebaseInitialState }

export default combineReducers({
  Firebase,
})
