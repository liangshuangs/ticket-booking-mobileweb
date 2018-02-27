import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import '../assets/css/normalize.css'
import '../assets/css/restyle.css'
import '../assets/iconfont/iconfont.css'
import Home from './home'
import Passenger from '../components/passenger/passenger'
import env from '../config/env'


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

// eslint-disable-next-line react/prefer-stateless-function
class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
  }

  render() {

    return (
      <Router basename={env.ROOT_PATH}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/passenger" component={Passenger} />
        </Switch>
      </Router>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
