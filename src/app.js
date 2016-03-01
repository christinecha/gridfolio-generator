"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer.js'
import * as action from './actions.js'
import * as helper from './helpers.js'
import { FolioStyle, Folio } from './myGridfolio.js'
import { GridfolioGUIContainer } from './components/GridfolioGUI.jsx'

const store = createStore(reducer)

store.dispatch({
  type: 'GET_INITIAL_STATE',
  data: {
    FolioStyle: FolioStyle,
    Folio: Folio
  }
})


ReactDOM.render(
  <Provider store={store}>
    <GridfolioGUIContainer />
  </Provider>,
  document.getElementById('gridfolio-react')
)
