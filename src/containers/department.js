import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Department from '../components/department/department'
import { changeCostDepartment } from '../action/department'


const mapStateToProps = state => ({
  department: state.department
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeCostDepartment,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tost: null,
    }
  }

  componentWillMount(){
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  updateCostDepartment = (department) => {
    if(department === 1) {
      this.setState({tost:"提示信息"})
    }
  }

  render() {

    const { historyBack, updateCostDepartment } = this
    const { tost } = this.state

    const props = {...this.props, historyBack, updateCostDepartment, tost}

    return (<Department {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
