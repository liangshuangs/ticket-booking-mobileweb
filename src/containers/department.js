import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Department from '../components/department/department'
import { changeCostDepartment, changeTabsIndex } from '../action/department'
import tost from '../components/tost/tost'


const mapStateToProps = state => ({
  department: state.department
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeCostDepartment,
    changeTabsIndex,
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

  updateCostDepartment = (department) => {
    this.props.changeCostDepartment(department) // 确定费用部门后 保存部门ID
    tost('消息1 2秒')
    tost({msg:'message2',time:4})
    tost({msg:'message3',time:6})
  }

  toggleApproverModal = () => {
    this.setState((old)=>(
      {...old, approverModalShow: !old.approverModalShow}
    ))
  }

  render() {
    const { historyBack, updateCostDepartment, gotoCostcenter, gotoProject, gotoRemark, toggleApproverModal } = this
    const { approverModalShow } = this.state
    const props = {...this.props, historyBack, updateCostDepartment, gotoCostcenter, gotoProject, gotoRemark, toggleApproverModal, approverModalShow}

    return (<Department {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
