import React from 'react'
import { Provider } from 'react-redux'
import { Router } from '../../config'
import store from '../../redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
