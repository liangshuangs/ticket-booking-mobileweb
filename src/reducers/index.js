import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user'
import department from './department'
import passenger from './passenger'
import approver from './approver'
import remark from './remark'

export default combineReducers({
  user,
  department,
  passenger,
  approver,
  remark,
  routing: routerReducer, // 整合路由
})
