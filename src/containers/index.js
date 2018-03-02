import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import '../assets/css/normalize.css'
import '../assets/css/restyle.css'
import '../assets/iconfont/iconfont.css'
import Home from './home'
import Passenger from './passenger'
import Department from './department'
import Costcenter from './costcenter'
import Project from './project'
import Remark from './remark'
import env from '../config/env'
import { getUserInfo } from '../action/home'


const mapStateToProps = state => ({
  userInfo: state.user.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserInfo,
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
    this.props.getUserInfo() // 获取用户信息
  }

  render() {

    const { userInfo } = this.props
    console.log(userInfo,Object.keys(userInfo))
    if(Object.keys(userInfo).length === 0) {
      return null;
    }

    return (
      <Router basename={env.ROOT_PATH}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/passenger" component={Passenger} />
          <Route path="/department" component={Department} />
          <Route path="/costcenter" component={Costcenter} />
          <Route path="/project" component={Project} />
          <Route path="/remark" component={Remark} />
        </Switch>
      </Router>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
