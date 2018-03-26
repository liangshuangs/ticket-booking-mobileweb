import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Department from '../components/department/department'
import { changeCostDepartment, changeTabsIndex, setCostDepartmentData, getOtherDepartmentApprover } from '../action/department'
import { getProjectInfo, getProjectApprover } from '../action/project'
import { setApprover, resetApprover } from '../action/approver'
import tost from '../components/tost/tost'


const mapStateToProps = state => ({
  department: state.department,
  userInfo: state.user.info,
  remark: state.remark,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeCostDepartment,
    changeTabsIndex,
    getProjectInfo,
    getProjectApprover,
    setCostDepartmentData,
    getOtherDepartmentApprover,
    setApprover,
    resetApprover,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      approverModalShow: false,
    }
  }

  componentWillMount(){
    this.getProjectInfoWillMount()
    this.getOtherDepartmentApproverWillMount()
  }

  // 已经选择了项目卡2 和 项目item数据 接着获取详细数据
  getProjectInfoWillMount = () => {
    const { department, getProjectInfo, getProjectApprover, userInfo, setCostDepartmentData } = this.props
    const {tabsIndex, costDepartmentData} = department
    const { projectInfoSimple, projectInfo } = costDepartmentData[2]
    if(tabsIndex === 2 && Object.keys(projectInfoSimple).length > 0 && Object.keys(projectInfo).length === 0) {

      const {projectId,projectCode,projectType} = projectInfoSimple
      const { personId:applyerId } = userInfo
      const costDepartmentData2 = _.cloneDeep(costDepartmentData[2])
      let infoIsFull = 0
      // 先获取项目的详细信息
      getProjectInfo(projectCode,projectType,applyerId).then(res=>{
        if(res && res.response && res.response.result === '0000') {
          costDepartmentData2.projectInfo = res.response.data[0]
          if(++infoIsFull === 2) {
            // 保存 项目信息到 store
            setCostDepartmentData(2,costDepartmentData2)
          }
        }else if(res && res.response && res.response.message){
          tost(res.response.message)
        }else{
          tost('未能获取该项目的详细信息')
        }
      })
      // 然后获取项目的审批人
      getProjectApprover(projectId).then(res=>{
        if(res && res.response && res.response.result === '0000') {
          const {text:name, value:personId} = res.response.data[0]
          if(name && personId) {
            costDepartmentData2.approverInfo = {name,personId}
            if(++infoIsFull === 2) {
              // 保存 项目信息到 store
              setCostDepartmentData(2,costDepartmentData2)
            }
          }else{
            tost('审批人数据错误')
          }
        }else if(res && res.response && res.response.message){
          tost(res.response.message)
        }else{
          tost('未能获取该项目的审批人')
        }
      })
    }
  }

  // 获取跨部门审批人
  getOtherDepartmentApproverWillMount = () => {
    const { getOtherDepartmentApprover, department } = this.props
    const {tabsIndex, costDepartmentData} = department
    const { costCenter } = costDepartmentData[1]

    if(tabsIndex === 1 && Object.keys(costCenter).length > 0) {
      const {ccId} = costCenter
      getOtherDepartmentApprover(ccId).then(res=>{
        if(res && res.response && res.response.result === '0000' && res.response.data && res.response.data.length > 0) {
        }else{
          tost('没有相关审批人')
        }
      })
    }

  }

  // 选择 设置 审批人
  selectOtherDepartmentApprover = (approver) => {
    const { department, setCostDepartmentData } = this.props
    const { costDepartmentData } = department
    const data = _.cloneDeep(costDepartmentData[1])
    data.approver = approver
    setCostDepartmentData(1,data)
  }


  gotoHome = () => {
    this.props.history.push('/')
  }

  gotoCostcenter = () => {
    this.props.history.push('/costcenter')
  }

  gotoProject = () => {
    this.props.history.push('/project')
  }

  gotoRemark = () => {
    this.props.history.push('/remark')
  }

  // 更新审批部门
  updateCostDepartment = (tableIndex) => {
    console.log('tableIndex',tableIndex)
    const {department} = this.props
    const { costDepartmentData } = department
    const data = costDepartmentData[tableIndex]
    let approver = {}
    console.log('data',data)
    if(tableIndex === 1 && Object.keys(data.costCenter).length === 0) {
      tost('请选择成本中心')
      return
    }

    if(tableIndex === 1 && Object.keys(data.approver).length === 0) {
      tost('请选择审批人')
      return
    }

    if(tableIndex === 2 && Object.keys(data.projectInfo).length === 0) {
      tost('请选择项目')
      return
    }

    if(tableIndex === 2 && Object.keys(data.approverInfo).length === 0) {
      tost('您选择的项目没有相关审批人')
      return
    }

    // 更新审批人的副本（三个项目部门的初始数据分别保存在各自的数组中，为了方便操作审批人，所以审批人单独保存一个副本）
    if(tableIndex === 0) {
      const {parentStaffName:name, parentStaffId:personId, costCenter:ccId, sbuId} = data
      approver = {name,personId,ccId,sbuId}
    }else if(tableIndex ===1){
      const {text:name, value:personId} = data.approver
      const {ccId,sbuId} = data.costCenter
      approver = {name,personId,ccId,sbuId}
    }else{
      const {name,personId} = data.approverInfo
      const {sbuId} = data.projectInfoSimple
      const {ccId} = data.projectInfo
      approver = {name,personId,ccId,sbuId}
    }
    // 更新审批人的副本
    //this.props.setApprover(approver)
    this.props.resetApprover(approver) // 重置了部门也同时重置 审批人和审批人历史，审批人历史用户删除乘机人时降级到正确到审批人

    this.props.changeCostDepartment(tableIndex) // 确定费用部门后 保存部门ID

    this.props.history.push('/')
  }

  toggleApproverModal = () => {
    this.setState((old)=>(
      {...old, approverModalShow: !old.approverModalShow}
    ))
  }

  render() {
    const { gotoHome, updateCostDepartment, gotoCostcenter, gotoProject, gotoRemark, toggleApproverModal, selectOtherDepartmentApprover } = this
    const { approverModalShow } = this.state
    const props = {...this.props, gotoHome, updateCostDepartment, gotoCostcenter, gotoProject, gotoRemark, toggleApproverModal, approverModalShow, selectOtherDepartmentApprover}

    return (<Department {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
