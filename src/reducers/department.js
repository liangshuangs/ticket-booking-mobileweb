import caseReducer from './caseReducer'
import _ from 'lodash'

const department = {
  costDepartment: 0, // 费用部门
  tabsIndex: 0, // tabsIndex 优先 costDepartment，但进入首页 tabsIndex 和 costDepartment 保持一致
  costDepartmentData: [
    {},
    {
      costCenter:{}, // cc
      approver:{} //审批人
    },
    {
      projectInfoSimple:{}, // 项目item信息
      projectInfo:{}, // 项目详细信息
      approverInfo: {}, // 项目审批人
    }
  ] // 费用部门数据
}

function changeCostDepartment(state, action) {
  return {...state, costDepartment: action.department}
}

function changeTabsIndex(state, action) {
  return {...state, tabsIndex: action.tabsIndex}
}

function setCostDepartmentData(state, action) {
  const { index, data } = action
  const costDepartmentData = _.cloneDeep(state.costDepartmentData)
  costDepartmentData[index] = data
  return {...state,costDepartmentData}
}

function getUserInfo(state, action) {
  const userInfo = action.response.staffInfo
  const {companyName,companyId,regionName,regionId,costCenterName,costCenter,sbuId,parentStaffName,parentStaffId} = userInfo
  const data = {companyName,companyId,regionName,regionId,costCenterName,costCenter,sbuId,parentStaffName,parentStaffId}
  const costDepartmentData = _.cloneDeep(state.costDepartmentData)
  costDepartmentData[0] = data
  return {...state,costDepartmentData}
}

export default caseReducer(department, {
  CHANGE_COST_DEPARTMENT: changeCostDepartment,
  CHANGE_TABS_INDEX: changeTabsIndex,
  SET_COST_DEPARTMENT_DATA: setCostDepartmentData,
  GET_USER_INFO_SUCCESS:getUserInfo,
})