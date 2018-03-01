import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Costcenter from '../components/costcenter/costcenter'


const mapStateToProps = state => ({

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

    return (<Costcenter {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
