import { combineReducers } from 'redux'

import { default as Firebase, initialState as FirebaseInitialState } from './Firebase'
import { default as App, initialState as AppInitialState } from './App'

export const initialStates = { 
  Firebase: FirebaseInitialState,
  App: AppInitialState 
 }

export default combineReducers({
  App,
  Firebase,
})
