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