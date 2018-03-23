import caseReducer from './caseReducer'

const approver = {
  info:{}
}

function setApprover(state, action) {
  //console.log('action',action)
  return {...state, info:{...action.info}}
}

export default caseReducer(approver, {
  SET_APPROVER: setApprover,
})