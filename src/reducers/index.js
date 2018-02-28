import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import department from './department'

export default combineReducers({
  department,
  routing: routerReducer, // 整合路由
})
