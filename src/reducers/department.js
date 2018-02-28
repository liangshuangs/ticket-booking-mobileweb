import caseReducer from './caseReducer'

const department = {
  costDepartment: 0, // 费用部门
}

function changeCostDepartment(state, action) {
  return {...state, costDepartment: action.department}
}

export default caseReducer(department, {
  CHANGE_COST_DEPARTMENT: changeCostDepartment,
})