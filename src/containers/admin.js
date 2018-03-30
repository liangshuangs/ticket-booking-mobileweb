/**
 * 没有获取用户信息不会渲染到这个页面
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import md5 from 'md5'
import Admin from '../components/admin/admin'


const mapStateToProps = state => ({
  userInfo: state.user.info,
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

  componentDidMount(){
    console.log('componentDidMount')
    this.openUrl(this.getUrl())
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    this.openUrl(this.getUrl())
  }

  getYMDHMS = (d) => {
    const Y = d.getFullYear()
      ,M = this.get0(d.getMonth() +1)
      ,D = this.get0(d.getDate())
      ,H = this.get0(d.getHours())
      ,Ms = this.get0(d.getMinutes())
      ,S = this.get0(d.getSeconds())
    return `${Y}${M}${D}${H}${Ms}${S}`
  }
  get0 = (d) => {
    return d < 10 ? `0${d}` : d
  }

  getUrl = () => {
    //Common.Framework.Configuration.BaoKuSubmitURL + "?timestamp=" + timestamp + "&bkcid=" + Common.Framework.Configuration.GetDataBackCompanyID + "&comLocalCode=" + this.LoginUser.Tenant
    //+ "&emnum=" + this.LoginUser.UserID + "&sign=" + sign + "&direction=WEB&homePage=apporder";
    const {bgId, personId} = this.props.userInfo
    const bkurl = 'http://apics.baoku.com/open/api/login/oaLogin',
      timestamp = this.getYMDHMS(new Date()),
      bkcid = '049',
      comLocalCode = bgId, // 员工BGID
      emnum = personId,
      salt = '946fd49ecf29691e97446af73e0ae98a',
      direction = 'H5',
      homePage = 'apporder',
      sign = md5(`${timestamp}${bkcid}${emnum}${direction}${homePage}${salt}`)

    const url = `${bkurl}?timestamp=${timestamp}&bkcid=${bkcid}&comLocalCode=${comLocalCode}&emnum=${emnum}&sign=${sign}&direction=${direction}&homePage=${homePage}`

    return url
  }

  openUrl = (url) => {
    window.location.href = url
  }

  render() {

    const props = { ...this.props }

    return (<Admin {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
