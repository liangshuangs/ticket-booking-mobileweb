import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Department from '../components/department/department'
import { changeCostDepartment, changeTabsIndex, setCostDepartmentData, getOtherDepartmentApprover } from '../action/department'
import { getProjectInfo } from '../action/project'
import tost from '../components/tost/tost'


const mapStateToProps = state => ({
  department: state.department,
  userInfo: state.user.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeCostDepartment,
    changeTabsIndex,
    getProjectInfo,
    setCostDepartmentData,
    getOtherDepartmentApprover,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      approverData: [],
      approverModalShow: false,
    }
  }

  componentWillMount(){
    this.getProjectInfoWillMount()
    this.getOtherDepartmentApproverWillMount()
  }

  // 已经选择了项目卡2 和 项目item数据 接着获取详细数据
  getProjectInfoWillMount = () => {
    const { department, getProjectInfo, userInfo, setCostDepartmentData } = this.props
    const {tabsIndex, costDepartmentData} = department
    const { projectInfoSimple, projectInfo } = costDepartmentData[2]
    if(tabsIndex === 2 && Object.keys(projectInfoSimple).length > 0 && Object.keys(projectInfo).length === 0) {

      const {projectCode,projectType} = projectInfoSimple
      const { personId:applyerId } = userInfo
      getProjectInfo(projectCode,projectType,applyerId).then(res=>{
        if(res && res.response && res.response.result === '0000') {
          const data = _.cloneDeep(costDepartmentData[2])
          data.projectInfo = res.response.data[0]
          setCostDepartmentData(2,data)
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
          this.setState({approverData:res.response.data})
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


  historyBack = () => {
    this.props.history.goBack()
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

  updateCostDepartment = (tableIndex) => {
    const {department} = this.props
    const { costDepartmentData } = department
    const data = costDepartmentData[1]
    if(Object.keys(data.costCenter).length === 0) {
      tost('请选择成本中心')
      return
    }

    if(Object.keys(data.approver).length === 0) {
      tost('请选择审批人')
      return
    }

    this.props.changeCostDepartment(tableIndex) // 确定费用部门后 保存部门ID

    this.props.history.push('/')
  }

  toggleApproverModal = () => {
    this.setState((old)=>(
      {...old, approverModalShow: !old.approverModalShow}
    ))
  }

  render() {
    const { historyBack, updateCostDepartment, gotoCostcenter, gotoProject, gotoRemark, toggleApproverModal, selectOtherDepartmentApprover } = this
    const { approverModalShow, approverData } = this.state
    const props = {...this.props, historyBack, updateCostDepartment, gotoCostcenter, gotoProject, gotoRemark, toggleApproverModal, approverModalShow, approverData, selectOtherDepartmentApprover}

    return (<Department {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
