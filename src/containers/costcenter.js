import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Costcenter from '../components/costcenter/costcenter'
import { getCostCenter, getCostCenterRecent } from '../action/costcenter'
import { setCostDepartmentData } from '../action/department'
import tost from '../components/tost/tost'


const mapStateToProps = state => ({
  costDepartmentData: state.department.costDepartmentData,
  userInfo: state.user.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getCostCenter,
    getCostCenterRecent,
    setCostDepartmentData,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      costCenterList: [],
      selectCostCenterData: {}
    }
  }

  componentWillMount(){
    this.getCostCenterRecentCall()
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  // 搜索值不为空 执行的回掉
  getCostCenterCall = _.debounce((value) => {
    const {getCostCenter} = this.props
    this.keywords = value // 保留最后一个搜索关键词
    getCostCenter(value).then(res=>{
      if(res && res.response && res.response.result === '0000') {
        // 只拿取和最后一个关键词 匹配的搜索结果
        if(this.keywords === res.requestInformation.keywords) {
          this.setState({costCenterList:res.response.data})
        }
      }
    })
  },200)
  // 搜索值为空 执行的回掉
  getCostCenterRecentCall = () => {
    const { getCostCenterRecent, userInfo } = this.props
    getCostCenterRecent(userInfo.personId).then(res=>{
      if(res && res.response && res.response.result === '0000') {
        this.setState({costCenterList:res.response.data})
      }
    })
  }

  selectCostCenter = (data) => {
    this.setState({selectCostCenterData:data})
  }

  // 确定选择CC
  confirmCostCenter = () => {
    const { selectCostCenterData } = this.state

    if(Object.keys(selectCostCenterData).length === 0) {
      if(!this.time || new Date().getTime() - this.time > 2000) {
        this.time = new Date().getTime()
        tost('请选择成本中心')
      }
      return
    }

    const { costDepartmentData, setCostDepartmentData, history } = this.props

    const data = _.cloneDeep(costDepartmentData[1])
    data.costCenter = selectCostCenterData
    data.approver = {} // 重置审批人

    setCostDepartmentData(1,data)
    history.push('/department')
  }


  render() {

    const { historyBack, confirmCostCenter, getCostCenterCall, getCostCenterRecentCall, selectCostCenter } = this
    const { costCenterList, selectCostCenterData } = this.state

    const props = {...this.props, historyBack, confirmCostCenter, getCostCenterCall, getCostCenterRecentCall, costCenterList, selectCostCenter, selectCostCenterData }

    return (<Costcenter {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
