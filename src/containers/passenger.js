import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Passenger from '../components/passenger/passenger'
import tost from '../components/tost/tost'
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
    getRecentPassenger(userInfo.personId).then(res=>{
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
  getPassengerCall = _.debounce((value,bgId,pageNumber=1) => {
    this.keywords = value // 保留最后一个搜索关键词
    this.pageNumber = pageNumber
    this.bgId = bgId

    this.props.getPassenger(value,bgId,this.pageNumber).then(res=>{
      if(res && res.response && res.response.result === '0000' && res.response.data) {
        if(res.response.data.length >= 0 && this.keywords === res.requestInformation.keywords){
          // 只拿取和最后一个关键词 匹配的搜索结果
          const oldList = this.pageNumber > 1 ? this.state.passengerList : []
          this.setState({passengerList:oldList.concat(res.response.data)})
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
  },200)

  // 选择乘机人 缓存
  selectPassengerCache = (item) => {
    const {selectPassengerListCache} = this.state
    const {selectPassengerList} = this.props

    // 去重复
    if(_.findIndex(selectPassengerListCache, ['EMPLOYEE_NUMBER', item.EMPLOYEE_NUMBER]) === -1) {
      delete item.isChecked
      const list = selectPassengerListCache.concat(item)
      if(selectPassengerList.length + list.length > 9) {
        tost('最多可选择9名乘机人')
        return
      }
      this.setState({selectPassengerListCache: list})
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

  onScroll = (e) => {
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if(scrollTop+offsetHeight >= scrollHeight -10 && (scrollTop >= (this.scrollTop || 0))) {
      // 接近地步 10个像素 并且向上滑动
      this.scrollTop = scrollTop
      this.getPassengerCall(this.keywords, this.bgId, ++this.pageNumber)
    }
  }


  render() {

    const { historyBack, getPassengerCall, selectPassengerCache, deletePassengerCache, selectPassengerConfirm, onScroll } = this

    const { passengerList, selectPassengerListCache, isSearch } = this.state

    const props = {...this.props,
      historyBack,
      getPassengerCall,
      passengerList,
      selectPassengerCache,
      selectPassengerListCache,
      deletePassengerCache,
      selectPassengerConfirm,
      isSearch,
      onScroll,
    }

    return (<Passenger {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
