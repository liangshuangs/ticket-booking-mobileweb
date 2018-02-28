import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Passenger from '../components/passenger/passenger'


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

    return (<Passenger {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
