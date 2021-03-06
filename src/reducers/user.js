import caseReducer from './caseReducer'

const user = {
  info:{}
}

function getUserInfo(state, action) {
  return {...state, info:{...action.response.staffInfo}}
}

function resetBgId(state, action) {
  const bgId = action.response.data[0].value
  return {...state, info:{...state.info, bgId, bgIdIsReset: true}}
}

export default caseReducer(user, {
  GET_USER_INFO_SUCCESS: getUserInfo,
  RESTE_BGID:resetBgId,
})