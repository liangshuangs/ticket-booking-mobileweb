import { httpApi } from '../http/http'

export const getProject = (kw, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetProjectFromByCondition&projectCode=${kw}&projectName=${kw}&projectType=PROJECT_EFFECTIVE&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PROJECT_SUCCESS', 'GET_PROJECT_REQUEST', 'GET_PROJECT_FAILURE', 'NETWORK_FAILURE'],
  },
})

export const getProjectInfo = (projectCode,projectType,applyerId,isGetClosedProject=0,voucherTypeId='8C6A6C37-7907-163A-AE04-40003BA782B9') => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetSelectProjectInfo&projectCode=${projectCode}&projectType=${projectType}&applyerId=${applyerId}&isGetClosedProject=${isGetClosedProject}&voucherTypeId=${voucherTypeId}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PROJECT_INFO_SUCCESS', 'GET_PROJECT_INFO_REQUEST', 'GET_PROJECT_INFO_FAILURE', 'NETWORK_FAILURE'],
  },
})