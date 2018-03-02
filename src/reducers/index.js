import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import department from './department'

export default combineReducers({
  user,
  department,
  routing: routerReducer, // 整合路由
})
