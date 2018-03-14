import _ from 'lodash'
import caseReducer from './caseReducer'

const passenger = {
  selectList:[], // 已经选择
  recentList:[], //最近
  defalutIsSet: false, // 是否设置过默认乘机人
}

function selectPassenger(state, action) {
  const selectList = state.selectList.concat(action.selectList)
  const defaultIsSet = !!action.isDefault
  return {...state, selectList, defaultIsSet}
}

function deletePassenger(state, action) {
  const selectList = state.selectList.slice(0)

  _.remove(selectList,(n)=>(n.EMPLOYEE_NUMBER === action.item.EMPLOYEE_NUMBER))

  return {...state, selectList}
}

function getRecentPassenger(state, action) {
  return {...state,recentList:action.response.data}
}

function setRecentPassenger(state, action) {
  return {...state,recentList:action.list}
}

export default caseReducer(passenger, {
  SELECT_PASSENGER: selectPassenger,
  DELETE_PASSENGER: deletePassenger,
  GET_RECENT_PASSENGER_SUCCESS:getRecentPassenger,
  SET_RECENT_PASSENGER: setRecentPassenger,
})