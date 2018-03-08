import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Passenger from '../components/passenger/passenger'
import { getPassenger } from '../action/passenger'


const mapStateToProps = state => ({
  userInfo: state.user.info
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPassenger,
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

  getPassengerCall = (value,bgId) => {
    this.props.getPassenger(value,bgId)
  }


  render() {

    const { historyBack, getPassengerCall } = this

    const props = {...this.props, historyBack, getPassengerCall}

    return (<Passenger {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
