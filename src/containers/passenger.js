import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Passenger from '../components/passenger/passenger'
import { getPassenger, getRecentPassenger, selectPassenger, deletePassenger } from '../action/passenger'


const mapStateToProps = state => ({
  userInfo: state.user.info,
  selectPassengerList: state.passenger.selectList,
  recentPassengerList:state.passenger.recentList,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPassenger,
    getRecentPassenger,
    selectPassenger,
    deletePassenger,
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
    getRecentPassenger('67502')
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  getPassengerCall = (value,bgId) => {
    this.props.getPassenger(value,bgId).then(res=>{
      if(res && res.response && res.response.result === '0000') {
        this.setState({passengerList:res.response.data})
      }
    })

    if(value !== '') {
      this.setState({isSearch: true})
    }else{
      this.setState({isSearch: false})
    }
  }

  selectPassengerCache = (item) => {
    const {selectPassengerListCache} = this.state
    // 去重复
    if(_.findIndex(selectPassengerListCache, ['EMPLOYEE_NUMBER', item.EMPLOYEE_NUMBER]) === -1) {
      delete item.isChecked
      this.setState({selectPassengerListCache: selectPassengerListCache.concat(item)})
    }
  }

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

    console.log('1',this.props.recentPassengerList)

    const { historyBack, getPassengerCall, selectPassengerCache, deletePassengerCache, selectPassengerConfirm } = this

    const { passengerList, selectPassengerListCache, isSearch } = this.state

    const props = {...this.props, historyBack, getPassengerCall, passengerList, selectPassengerCache, selectPassengerListCache, deletePassengerCache, selectPassengerConfirm, isSearch}

    return (<Passenger {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
