import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Project from '../components/project/project'
import { getProject, getProjectRecent } from '../action/project'
import { setCostDepartmentData } from '../action/department'
import tost from "../components/tost/tost"


const mapStateToProps = state => ({
  costDepartmentData: state.department.costDepartmentData,
  userInfo: state.user.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getProject,
    getProjectRecent,
    setCostDepartmentData,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectInfoList: [],
      selectProjectInfoData: {}
    }
  }

  componentWillMount(){
    this.getProjectRecentCall()
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  getProjectCall = _.debounce((value,pageNumber=1) => {
    const { getProject } = this.props
    this.keywords = value // 保留最后一个搜索关键词
    this.pageNumber = pageNumber
    getProject(value,this.pageNumber).then(res=>{
      if(res && res.response && res.response.result === '0000') {
        // 只拿取和最后一个关键词 匹配的搜索结果
        if(this.keywords === res.requestInformation.keywords) {
          const oldList = this.pageNumber > 1 ? this.state.projectInfoList : []
          this.setState({projectInfoList:oldList.concat(res.response.data)})
        }
      }
    })
  },200)

  getProjectRecentCall = () => {
    const { getProjectRecent, userInfo } = this.props
    getProjectRecent(userInfo.personId).then(res=>{
      if(res && res.response && res.response.result === '0000') {
        this.setState({projectInfoList:res.response.data})
      }
    })
  }

  selectProjectInfo = (data) => {
    this.setState({selectProjectInfoData:data})
  }

  // 确定选择
  confirmProjectInfo = () => {
    const { selectProjectInfoData } = this.state

    if(Object.keys(selectProjectInfoData).length === 0) {
      if(!this.time || new Date().getTime() - this.time > 2000) {
        this.time = new Date().getTime()
        tost('请选择项目')
      }
      return
    }

    const { costDepartmentData, setCostDepartmentData, history } = this.props

    const data = _.cloneDeep(costDepartmentData[2])
    data.projectInfoSimple = selectProjectInfoData
    data.projectInfo = {} //先重置  然后重新获取

    setCostDepartmentData(2,data)
    history.push('/department')
  }

  onScroll = (e) => {
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if(scrollTop+offsetHeight >= scrollHeight -10 && (scrollTop >= (this.scrollTop || 0))) {
      // 接近地步 10个像素 并且向上滑动
      this.scrollTop = scrollTop
      this.getProjectCall(this.keywords, ++this.pageNumber)
    }
  }


  render() {

    const { historyBack, getProjectCall, getProjectRecentCall, selectProjectInfo, confirmProjectInfo, onScroll } = this

    const { projectInfoList, selectProjectInfoData } = this.state

    const props = {...this.props, historyBack, getProjectCall, getProjectRecentCall, projectInfoList, selectProjectInfo, selectProjectInfoData, confirmProjectInfo, onScroll}

    return (<Project {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
