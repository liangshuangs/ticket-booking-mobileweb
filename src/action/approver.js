import { httpApi } from '../http/http'

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