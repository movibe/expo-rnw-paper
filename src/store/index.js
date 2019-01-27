import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import { default as rootReducer, initialStates } from './reducers'

import '@styles/app.scss'

function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureAppStore(initialStates)