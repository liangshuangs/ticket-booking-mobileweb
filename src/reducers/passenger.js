import _ from 'lodash'
import caseReducer from './caseReducer'

const passenger = {
  selectList:[]
}

function selectPassenger(state, action) {
  const selectList = state.selectList.concat(action.selectList)
  return {...state, selectList}
}

function deletePassenger(state, action) {
  const selectList = state.selectList.slice(0)

  _.remove(selectList,(n)=>(n.EMPLOYEE_NUMBER === action.item.EMPLOYEE_NUMBER))

  return {...state, selectList}
}

export default caseReducer(passenger, {
  SELECT_PASSENGER: selectPassenger,
  DELETE_PASSENGER: deletePassenger,
})