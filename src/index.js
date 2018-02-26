import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import reducers from './reducers/index'
import Root from './containers/index'
import env from './config/env'
import setSize from './utils/setSize'


function loader() {
  setSize();
  const history = createHistory()
  const middleware = [thunk, routerMiddleware(history)]
  // see: http://zalmoxisus.github.io/redux-devtools-extension/
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

  const enhancer = composeEnhancers(applyMiddleware(...middleware))

  const store = createStore(reducers, enhancer)

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  )
}

function bootstrap() {
  if(env.ENV === 'development') {
    if (window.location.hash && window.location.hash.indexOf('access_token=') > -1) {
      window.sessionStorage.setItem('token', `${window.location.hash.split('access_token=')[1].split('&')[0]}`)
      window.sessionStorage.setItem('ticket','ruIgS8Nan876/CwbVWo6/84zcVmxQ8HRkwlqq1NkZXhS8IWchtI03w==')
      window.sessionStorage.setItem('ticketKey','FHsuhkqPf50P93Le29dPjlTQgjN2f4C2elyb8nzbXvV5GaQxZzhSlpx19WQ9tz/T/I2o968SS2GqtKUnYLwRZKrQL3pSCF0dXHorLJM1bZHaBTjgItmVwGSWbC6Z/G6ExBo5Vol3tjHRzUtz0C/SZfFj5yftThHr7C94800Ik2c=')
    }
    loader()
  } else {
    if (window.location.hash && window.location.hash.indexOf('access_token=') > -1) {
      window.sessionStorage.setItem('token', `${window.location.hash.split('access_token=')[1].split('&')[0]}`)
      window.sessionStorage.setItem('ticket','ruIgS8Nan876/CwbVWo6/84zcVmxQ8HRkwlqq1NkZXhS8IWchtI03w==')
      window.sessionStorage.setItem('ticketKey','FHsuhkqPf50P93Le29dPjlTQgjN2f4C2elyb8nzbXvV5GaQxZzhSlpx19WQ9tz/T/I2o968SS2GqtKUnYLwRZKrQL3pSCF0dXHorLJM1bZHaBTjgItmVwGSWbC6Z/G6ExBo5Vol3tjHRzUtz0C/SZfFj5yftThHr7C94800Ik2c=')
      loader()
    } else if(window.kara) {
      getToken()
      getTicket()
    } else {
      document.addEventListener('JSSDKReady', function(){
        getToken()
        getTicket()
      }, false);
    }
  }
}

function getToken() {
  window.kara.getToken({
    success: function(result) {
      sessionStorage.token = result.token
    }
  })
}

function getTicket() {
  window.kara.getMobileTicket({
    success: function(result) {
      // result.ticket 应用ticket
      // result.ticketKey 应用ticketKey
      sessionStorage.ticket = result.ticket
      sessionStorage.ticketKey = result.ticketKey
      loader()
    }
  })
}

export default bootstrap()