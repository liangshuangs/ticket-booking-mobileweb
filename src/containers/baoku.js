import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Baoku from '../components/baoku/baoku'


const mapStateToProps = state => ({
  remark: state.remark,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
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

    return (<Baoku {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
