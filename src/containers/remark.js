import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Remark from '../components/remark/remark'
import { setRemark } from "../action/remark"


const mapStateToProps = state => ({
  remark: state.remark,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setRemark,
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


  render() {

    const { historyBack } = this

    const props = {...this.props, historyBack}

    return (<Remark {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
