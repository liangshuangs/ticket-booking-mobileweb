import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../components/home/home'
import { getUserInfo } from '../action/home'
import { changeTabsIndex } from '../action/department'


const mapStateToProps = state => ({
  costDepartment: state.department.costDepartment
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeTabsIndex,
    getUserInfo,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    const { changeTabsIndex, costDepartment=0, getUserInfo } = this.props
    changeTabsIndex(costDepartment)
    getUserInfo() // 获取用户信息
  }

  selectPassenger = () => {
    this.props.history.push('/passenger')
  }

  selectDepartment = () => {
    this.props.history.push('/department')
  }

  render() {

    const { selectPassenger, selectDepartment } = this

    const props = {...this.props, selectPassenger, selectDepartment}

    return (<Home {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
