import { httpApi } from '../http/http'

export const getCostCenter = (costCenterID, pageNumber=1, pageSize=10) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetCostCenterByCondition&costCenterID=${costCenterID}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    options: {
      method: 'POST'
    },
    types: ['GET_COST_CENTER_SUCCESS', 'GET_COST_CENTER_REQUEST', 'GET_COST_CENTER_FAILURE', 'NETWORK_FAILURE'],
  },
})