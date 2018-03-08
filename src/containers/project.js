import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Project from '../components/project/project'
import { getProject } from '../action/project'
import { setCostDepartmentData } from '../action/department'
import tost from "../components/tost/tost"


const mapStateToProps = state => ({
  costDepartmentData: state.department.costDepartmentData
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getProject,
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
  }

  historyBack = () => {
    this.props.history.goBack()
  }

  getProjectCall = (value) => {
    const { getProject } = this.props
    getProject(value).then(res=>{
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


  render() {

    const { historyBack, getProjectCall, selectProjectInfo, confirmProjectInfo } = this

    const { projectInfoList, selectProjectInfoData } = this.state

    const props = {...this.props, historyBack, getProjectCall, projectInfoList, selectProjectInfo, selectProjectInfoData, confirmProjectInfo}

    return (<Project {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
