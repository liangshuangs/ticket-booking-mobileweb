import { httpApi } from '../http/http'

export const getUserInfo = () => ({
  [httpApi]: {
    url: '/sdm/getCurrentStaff',
    options: {
      method: 'GET',
    },
    types: ['GET_USER_INFO_SUCCESS', 'GET_USER_INFO_REQUEST', 'GET_USER_INFO_FAILURE', 'NETWORK_FAILURE'],
  },
})

export const submitVoucher = (body) => {
  return {
    [httpApi]: {
      url: `/aitos/pagego?function=SubmitVoucher&json=${JSON.stringify(body)}`,
      options: {
        method: 'POST',
      },
      types: ['GET_ORTHER_DEPARTMENT_APPROVER_SUCCESS'],
    },
  }
}

// 重新获取bgId
export const resetBgId = (companyId) => {
  return {
    [httpApi]: {
      url: `/aitos/pagego?function=GetEmployeeBGId&companyId=${companyId}`,
      options: {
        method: 'POST',
      },
      types: ['RESTE_BGID'],
    },
  }
}