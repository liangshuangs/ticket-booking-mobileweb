import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Home from '../components/home/home'
import { changeTabsIndex } from '../action/department'
import { deletePassenger } from '../action/passenger'
import { getApprover, setApprover } from '../action/approver'


const mapStateToProps = state => ({
  costDepartment: state.department.costDepartment,
  costDepartmentData: state.department.costDepartmentData,
  userInfo: state.user.info,
  selectPassengerList: state.passenger.selectList,
  newApprover: state.approver.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeTabsIndex,
    deletePassenger,
    getApprover,
    setApprover,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    const { changeTabsIndex, costDepartment=0 } = this.props
    changeTabsIndex(costDepartment) // 重置 tabsIndex
    this.resetApprover() // 尝试 重置 审批人
  }

  componentWillReceiveProps(){
    this.resetApprover() // 尝试 重置 审批人
  }

  selectPassenger = () => {
    this.props.history.push('/passenger')
  }

  selectDepartment = () => {
    this.props.history.push('/department')
  }

  // 重置审批人
  resetApprover = () => {
    // 获取当前的审批人
    // 去乘机人中对比
    // 更新审批人
    const { costDepartment=0, userInfo={}, newApprover={}, selectPassengerList=[], getApprover, setApprover } = this.props
    let thisApprover = {} // 当前审批人
    if(Object.keys(newApprover).length > 0) {
      // 如果已经重置过审批人 新的审批人优先
      thisApprover = {...newApprover}
    }else if(costDepartment === 0) {
      // 如果是本部门
      const { parentStaffId, sbuId, costCenter } = userInfo
      thisApprover.presonId = parentStaffId
      thisApprover.sbuId = sbuId
      thisApprover.ccId = costCenter
    }else if(costDepartment === 1){

    }else{
      // 2

    }

    // 开始对比
    if(_.findIndex(selectPassengerList,['PERSON_ID',thisApprover.presonId]) !== -1) {
      //  如果审批人 在 乘机人 中
      // 先获取
      getApprover(thisApprover.presonId,thisApprover.sbuId,thisApprover.ccId).then(res=>{
        if(res && res.response && res.response.result === '0000') {
          const { text:name, value:presonId } = res.response.data[0]
          console.log(res.response.data[0])
          // 更新审批人
          setApprover({name,presonId,sbuId:thisApprover.sbuId,ccId:thisApprover.ccId})
        }
      })
    }

  }

  render() {

    const { selectPassenger, selectDepartment } = this

    const props = {...this.props, selectPassenger, selectDepartment}

    return (<Home {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
