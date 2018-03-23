import caseReducer from './caseReducer'

const remind = {
  is: false, // 默认不显示提示modal
  doNotRemind: false, // 已经提醒过 不要多次提醒
}

function isRemind(state, action) {
  return {...state, is:{...action.is}}
}

function doNotRemind(state, action) {
  return {...state, doNotRemind: true, is: false}
}

export default caseReducer(remind, {
  IS_REMIND: isRemind,
  DO_NONT_REMIND:doNotRemind,
})