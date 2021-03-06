import caseReducer from './caseReducer'
import _ from 'lodash'

const department = {
  costDepartment: 0, // 费用部门
  tabsIndex: 0, // tabsIndex 优先 costDepartment，但进入首页 tabsIndex 和 costDepartment 保持一致
  costDepartmentData: [
    {},
    {
      costCenter:{}, // cc
      approver:{}, // 已选审批人
      approverData: [] // 候选审批人列表
    },
    {
      projectInfoSimple:{}, // 项目item信息
      projectInfo:{}, // 项目详细信息 通过simple 获取详细信息 重置taskInfo
      approverInfo: {}, // 项目审批人
      taskInfo: {}, // 获取项目详细信息会有任务号数组 任务号需要单独选择一次
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

function getOtherDepartmentApprover(state, action) {
  if(action.response.data && action.response.data.length > 0) {
    const costDepartmentData = _.cloneDeep(state.costDepartmentData)
    costDepartmentData[1].approverData = action.response.data
    return {...state, costDepartmentData}
  }else{
    return state
  }
}

export default caseReducer(department, {
  CHANGE_COST_DEPARTMENT: changeCostDepartment,
  CHANGE_TABS_INDEX: changeTabsIndex,
  SET_COST_DEPARTMENT_DATA: setCostDepartmentData,
  GET_USER_INFO_SUCCESS:getUserInfo,
  GET_ORTHER_DEPARTMENT_APPROVER_SUCCESS:getOtherDepartmentApprover,
})