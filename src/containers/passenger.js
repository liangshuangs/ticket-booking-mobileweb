import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Passenger from '../components/passenger/passenger'
import { getPassenger, getRecentPassenger, setRecentPassenger, selectPassenger, deletePassenger, getPassengerAvatar } from '../action/passenger'


const mapStateToProps = state => ({
  userInfo: state.user.info,
  selectPassengerList: state.passenger.selectList,
  recentPassengerList:state.passenger.recentList,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPassenger,
    getRecentPassenger,
    setRecentPassenger,
    selectPassenger,
    deletePassenger,
    getPassengerAvatar,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      passengerList: [],
      selectPassengerListCache: [],
      isSearch:false, // 是否在搜索
    }
  }

  componentWillMount(){
    const { userInfo, getRecentPassenger } = this.props
    // 获取近期乘机人
    //getRecentPassenger(userInfo.personId)
    // TODO
    getRecentPassenger('67502').then(res=>{
      if(res && res.response && res.response.result === '0000' && res.response.data && res.response.data.length > 0) {
        // 获取头像
        this.getPassengerAvatarCall(res.response.data,this.changeRecentPassengerAvatar)
      }
    })
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  // 获取头像
  getPassengerAvatarCall = (list,call) => {
    const staffCodes = list.map(v=>(v.EMPLOYEE_NUMBER))
    this.props.getPassengerAvatar(staffCodes).then(res=>{
      if(res && res.response && res.response.resultCode === '000000' && res.response.data && Object.keys(res.response.data).length > 0) {
        call(res.response.data)
      }
    })
  }

  // 更换搜索头像
  changeSearchPassengerAvatar = (staffCodesObj) => {
    const { passengerList } = this.state
    const list = passengerList.map(v=>{
      if(staffCodesObj[v.EMPLOYEE_NUMBER]) {
        return {...v,avatar:staffCodesObj[v.EMPLOYEE_NUMBER]}
      }else{
        return v
      }
    })
    this.setState({passengerList:list})
  }
  // 更换最近乘机人头像
  changeRecentPassengerAvatar = (staffCodesObj) => {
    const { recentPassengerList, setRecentPassenger } = this.props
    const list = recentPassengerList.map(v=>{
      if(staffCodesObj[v.EMPLOYEE_NUMBER]) {
        return {...v,avatar:staffCodesObj[v.EMPLOYEE_NUMBER]}
      }else{
        return v
      }
    })
    setRecentPassenger(list)
  }

  // 搜索乘机人
  getPassengerCall = (value,bgId) => {
    this.props.getPassenger(value,bgId).then(res=>{
      if(res && res.response && res.response.result === '0000' && res.response.data) {
        if(res.response.data.length > 0){
          this.setState({passengerList:res.response.data})
          // 获取头像
          this.getPassengerAvatarCall(res.response.data,this.changeSearchPassengerAvatar)
        }else{
          // 没有搜索结果
          this.setState({passengerList:[]})
        }
      }
    })

    if(value !== '') {
      this.setState({isSearch: true})
    }else{
      this.setState({isSearch: false})
    }
  }

  // 选择乘机人 缓存
  selectPassengerCache = (item) => {
    const {selectPassengerListCache} = this.state
    // 去重复
    if(_.findIndex(selectPassengerListCache, ['EMPLOYEE_NUMBER', item.EMPLOYEE_NUMBER]) === -1) {
      delete item.isChecked
      this.setState({selectPassengerListCache: selectPassengerListCache.concat(item)})
    }
  }

  // 删除乘机人 缓存
  deletePassengerCache = (item) => {
    const {selectPassengerListCache} = this.state
    const list = selectPassengerListCache.slice(0)
    const deleteList = _.remove(list,(n)=>(n.EMPLOYEE_NUMBER === item.EMPLOYEE_NUMBER))
    this.setState({selectPassengerListCache:list})
  }

  // 确定 选择 把选择的列表 保存到 store
  selectPassengerConfirm = () => {
    const { selectPassenger, history } = this.props
    const {selectPassengerListCache} = this.state
    selectPassenger(selectPassengerListCache)
    history.push('/')
  }


  render() {

    const { historyBack, getPassengerCall, selectPassengerCache, deletePassengerCache, selectPassengerConfirm } = this

    const { passengerList, selectPassengerListCache, isSearch } = this.state

    const props = {...this.props, historyBack, getPassengerCall, passengerList, selectPassengerCache, selectPassengerListCache, deletePassengerCache, selectPassengerConfirm, isSearch}

    return (<Passenger {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
