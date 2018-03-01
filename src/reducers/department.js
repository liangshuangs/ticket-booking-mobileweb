import caseReducer from './caseReducer'

const department = {
  costDepartment: 0, // 费用部门
  tabsIndex: 0, // tabsIndex 优先 costDepartment，但进入首页 tabsIndex 和 costDepartment 保持一致
}

function changeCostDepartment(state, action) {
  return {...state, costDepartment: action.department}
}

function changeTabsIndex(state, action) {
  return {...state, tabsIndex: action.tabsIndex}
}

export default caseReducer(department, {
  CHANGE_COST_DEPARTMENT: changeCostDepartment,
  CHANGE_TABS_INDEX: changeTabsIndex,
})