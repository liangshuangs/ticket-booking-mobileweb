import { httpApi } from '../http/http'

// 获取成本中心
export const getCostCenter = (costCenterID, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetCostCenterByCondition&costCenterID=${costCenterID}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_COST_CENTER_SUCCESS', 'GET_COST_CENTER_REQUEST', 'GET_COST_CENTER_FAILURE', 'NETWORK_FAILURE'],
  },
})

// 获取最近的成本中心
export const getCostCenterRecent = (personId, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetRecentCC&personId=${personId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_COST_CENTER_RECENT'],
  },
})