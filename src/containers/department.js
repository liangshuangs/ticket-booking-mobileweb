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
    }
  }

  componentWillMount(){

  }

  historyBack = () => {
    this.props.history.goBack()
  }

  updateCostDepartment = (department) => {
    this.props.changeCostDepartment(department) // 确定费用部门后 保存部门ID
    tost('消息1 2秒')
    tost({msg:'message2',time:4})
    tost({msg:'message3',time:6})
  }

  render() {
    const { historyBack, updateCostDepartment } = this

    const props = {...this.props, historyBack, updateCostDepartment}

    return (<Department {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
