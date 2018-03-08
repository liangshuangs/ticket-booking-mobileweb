import { httpApi } from '../http/http'

export function changeCostDepartment(department) {
  return {
    type: 'CHANGE_COST_DEPARTMENT',
    department,
  }
}

export function changeTabsIndex(tabsIndex) {
  return {
    type: 'CHANGE_TABS_INDEX',
    tabsIndex,
  }
}

export const setCostDepartmentData = (index,data) => ({
  type: 'SET_COST_DEPARTMENT_DATA',
  index,
  data,
})

export const getOtherDepartmentApprover = (costCenterID) => ({
  [httpApi]: {
    url: `/aitos/pagego?function=GetCostCenterOwnerInfoByCostCenterID&costCenterID=${costCenterID}`,
    options: {
      method: 'POST'
    },
    types: ['GET_ORTHER_DEPARTMENT_APPROVER_SUCCESS'],
  },
})