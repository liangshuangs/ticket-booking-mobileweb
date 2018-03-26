import { httpApi } from '../http/http'

// 获取上级审批人
export const getApprover = (empId,sbuId,ccId) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetDeptApprover&empId=${empId}&sbuId=${sbuId}&ccId=${ccId}`,
    options: {
      method: 'POST'
    },
    types: ['GET_APPROVER'],
  },
})

export const setApprover = (info) => ({
  type: 'SET_APPROVER',
  info,
})

export const delApprover = (info) => ({
  type: 'DEL_APPROVER',
  info,
})

export const resetApprover = (info) => ({
  type: 'RESET_APPROVER',
  info,
})