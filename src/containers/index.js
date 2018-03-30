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
import Tost from '../components/tost/tost'
import Admin from '../containers/admin'
import { getUserInfo, resetBgId } from '../action/home'


const mapStateToProps = state => ({
  userInfo: state.user.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserInfo,
    resetBgId,
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
    // 获取用户信息
    this.props.getUserInfo().then(res=>{
      if(res && res.response && res.response.resultCode === '000000' && res.response.staffInfo && res.response.staffInfo.companyId ) {
        // 重新设置bgId 用户信息提高的接口 和 机票预定提高的接口 数据不吻合  需要 两个接口数据的综合
        this.props.resetBgId(res.response.staffInfo.companyId)
      }else{
        Tost({msg: '获取用户信息出错', time: 10})
      }
    })
  }

  render() {

    alert(window.location.href)

    const { userInfo } = this.props
    // 如果 没有数据 或者 数据没有综合
    // || !userInfo.bgIdIsReset
    if(Object.keys(userInfo).length === 0 || !userInfo.bgIdIsReset) {
      return null;
    }

    alert('has user')

    return (
      <Router basename={env.ROOT_PATH}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/passenger" component={Passenger} />
          <Route path="/department" component={Department} />
          <Route path="/costcenter" component={Costcenter} />
          <Route path="/project" component={Project} />
          <Route path="/remark" component={Remark} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
