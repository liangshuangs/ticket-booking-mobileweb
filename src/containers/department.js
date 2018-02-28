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
    }
  }

  componentWillMount(){
  }

  render() {

    const props = {...this.props}

    return (<Department {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
