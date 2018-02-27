import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../components/home/home'


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

  selectPassenger = () => {
    this.props.history.push('/passenger')
  }

  render() {

    const { selectPassenger } = this

    const props = {...this.props, selectPassenger}

    return (<Home {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
