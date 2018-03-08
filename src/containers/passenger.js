import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Passenger from '../components/passenger/passenger'
import { getPassenger, selectPassenger, deletePassenger } from '../action/passenger'


const mapStateToProps = state => ({
  userInfo: state.user.info,
  selectPassengerList: state.passenger.selectList
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPassenger,
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
    }
  }

  componentWillMount(){
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  getPassengerCall = (value,bgId) => {
    this.props.getPassenger(value,bgId).then(res=>{
      console.log('res',res)
      if(res && res.response && res.response.result === '0000') {
        this.setState({passengerList:res.response.data})
      }
    })
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
    console.log('deleteList',deleteList)
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

    const { passengerList, selectPassengerListCache } = this.state

    const props = {...this.props, historyBack, getPassengerCall, passengerList, selectPassengerCache, selectPassengerListCache, deletePassengerCache, selectPassengerConfirm}

    return (<Passenger {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
