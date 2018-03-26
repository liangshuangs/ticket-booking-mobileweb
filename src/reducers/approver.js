import caseReducer from './caseReducer'

const approver = {
  info:{},
  historyInfo:[], // 缓存审批人历史 当删除的乘机人是历史中的 降级审批人为当前删除的乘机人
}

// 设置审批人
function setApprover(state, action) {
  let isIn = false // 审批人是否已经在历史里面
  if(state.historyInfo.length > 0) {
    for(let i of state.historyInfo) {
      if(action.info.personId === i.personId) {
        isIn = true
        break
      }
    }
  }
  if(isIn) {
    return {...state, info:{...action.info}}
  }else{
    // 不存在 就放入历史
    const historyInfo = state.historyInfo.concat(action.info)
    return {...state, info:{...action.info}, historyInfo}
  }
}

// 尝试删除审批人 当删除乘机人时 可能需要降级审批人
function delApprover(state, action) {

  console.log('state.historyInfo2',state.historyInfo)
  console.log('action',action)

  let n = 0
  let isIn = false // 删除的乘机人 是否 在 审批人历史中
  if(state.historyInfo.length > 0) {
    for(let i of state.historyInfo) {
      n++
      if(action.info.PERSON_ID === i.personId) {
        isIn = true
        break
      }
    }
  }

  console.log('n',n)

  if(isIn) {
    // 重新设置历史 和 当前审批人
    const historyInfo = state.historyInfo.slice(0,n)//.concat(state.historyInfo.slice(n+1)) 跨级别 不追溯审批人
    const info = historyInfo[historyInfo.length - 1]
    console.log('state.historyInfo',state.historyInfo)
    console.log('del historyInfo',historyInfo)
    console.log('del info',info)
    return {...state,info,historyInfo}
  }else{
    console.log('no del')
    return state
  }
}

// 当切换选项卡时 重置信息
function resetApprover(state, action) {
  return {...state, info:{...action.info}, historyInfo: [action.info]}
}

export default caseReducer(approver, {
  SET_APPROVER: setApprover,
  DEL_APPROVER: delApprover,
  RESET_APPROVER: resetApprover,
})