import caseReducer from './caseReducer'

const user = {
  info:{}
}

function getUserInfo(state, action) {
  return {...state, info:{...action.response.staffInfo}}
}

export default caseReducer(user, {
  GET_USER_INFO_SUCCESS: getUserInfo,
})