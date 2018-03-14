import { httpApi } from '../http/http'

// 获取项目列
export const getProject = (kw, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetProjectFromByCondition&projectCode=${kw}&projectName=${kw}&projectType=PROJECT_EFFECTIVE&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PROJECT_SUCCESS', 'GET_PROJECT_REQUEST', 'GET_PROJECT_FAILURE', 'NETWORK_FAILURE'],
  },
})

// 最近获取项目列
export const getProjectRecent = (personId, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetRecentProject&personId=${personId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PROJECT_RECENT'],
  },
})

// 获取项目详细信息
export const getProjectInfo = (projectCode,projectType,applyerId,isGetClosedProject=0,voucherTypeId='8C6A6C37-7907-163A-AE04-40003BA782B9') => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetSelectProjectInfo&projectCode=${projectCode}&projectType=${projectType}&applyerId=${applyerId}&isGetClosedProject=${isGetClosedProject}&voucherTypeId=${voucherTypeId}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PROJECT_INFO_SUCCESS', 'GET_PROJECT_INFO_REQUEST', 'GET_PROJECT_INFO_FAILURE', 'NETWORK_FAILURE'],
  },
})

// 获取项目审批人
export const getProjectApprover = (projectId) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetProjectApprover&projectId=${projectId}`,
    options: {
      method: 'POST'
    },
    types: ['GET_PROJECT_APPROVER_SUCCESS'],
  },
})