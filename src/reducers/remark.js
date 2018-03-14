import caseReducer from './caseReducer'

const remark = {
  text:''
}

function setRemark(state, action) {
  return {...state, text: action.text}
}

export default caseReducer(remark, {
  SET_REMARK: setRemark,
})