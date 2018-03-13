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
  let p = ''
  for(let i in body) {
    p+=`&${i}=${body[i]}`
  }
  console.log(`/aitos/pagego?function=SubmitVoucher${p}`)
  return {
    [httpApi]: {
      url: `/aitos/pagego?function=SubmitVoucher`,
      options: {
        method: 'POST',
        body,
      },
      types: ['GET_ORTHER_DEPARTMENT_APPROVER_SUCCESS'],
    },
  }
}