import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Home from '../components/home/home'
import { changeTabsIndex } from '../action/department'
import { deletePassenger } from '../action/passenger'
import { getApprover, setApprover } from '../action/approver'
import { submitVoucher } from '../action/home'
import tost from '../components/tost/tost'


const mapStateToProps = state => ({
  costDepartment: state.department.costDepartment,
  costDepartmentData: state.department.costDepartmentData,
  userInfo: state.user.info,
  selectPassengerList: state.passenger.selectList,
  approverInfo: state.approver.info,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeTabsIndex,
    deletePassenger,
    getApprover,
    setApprover,
    submitVoucher,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    const { changeTabsIndex, costDepartment=0 } = this.props
    changeTabsIndex(costDepartment) // 重置 tabsIndex
    this.resetApprover() // 尝试 重置 审批人
  }

  componentWillReceiveProps(){
    this.resetApprover() // 尝试 重置 审批人
  }

  // 关闭当前窗口
  leftClick = () => {
    if(window.kara) {
      window.kara.closePage()
    }else{
      document.addEventListener('JSSDKReady', function(){
        window.kara.closePage()
      }, false);
    }
  }

  selectPassenger = () => {
    this.props.history.push('/passenger')
  }

  selectDepartment = () => {
    this.props.history.push('/department')
  }

  // 重置审批人
  resetApprover = () => {
    // 获取当前的审批人
    // 去乘机人中对比
    // 更新审批人
    const { costDepartment=0, userInfo={}, approverInfo={}, selectPassengerList=[], getApprover, setApprover } = this.props
    if(Object.keys(approverInfo).length === 0) {
      // 默认没有设置审批人 取 userInfo 的信息设置 为默认的审批人
      const {parentStaffName:name, parentStaffId:personId, costCenter:ccId, sbuId} = userInfo
      console.log('默认审批人')
      setApprover({name,personId,ccId,sbuId}) // 默认审批人
      return
    }

    // 开始对比
    if(_.findIndex(selectPassengerList,['PERSON_ID',approverInfo.presonId]) !== -1) {
      //  如果审批人 在 乘机人 中
      // 先获取
      getApprover(approverInfo.presonId,approverInfo.sbuId,approverInfo.ccId).then(res=>{
        if(res && res.response && res.response.result === '0000') {
          const { text:name, value:presonId } = res.response.data[0]
          console.log(res.response.data[0])
          // 更新审批人 ccId sbuId 不变
          setApprover({name,presonId,sbuId:approverInfo.sbuId,ccId:approverInfo.ccId})
        }
      })
    }

  }

  submit = () => {
    // 提交参数
    const { submitVoucher, costDepartment=0, selectPassengerList, userInfo, costDepartmentData, approverInfo } = this.props

    console.log(this.props)

    if(selectPassengerList.length === 0) {
      tost('请选择乘机人')
      return
    }

    const b = {}

    const p = selectPassengerList.map(v=>({
      passangers_id: v.PERSON_ID, // 乘机人ID
      passangers_name: v.LAST_NAME, // 乘机人姓名
      passangers_number: v.EMPLOYEE_NUMBER, // 乘机人员工编号
      passangers_tel: v.MOBILE, // 乘机人联系方式
    }))

    b.isproject = costDepartment === 2 ? '1' : '0' // 是否涉及项目
    b.iscompany = costDepartment === 1 ? '1' : '0' // 是否跨部门
    b.expense_category_id = '6182cda2-f4d1-4c13-8533-0f2b666d9541' // 费用类型
    b.passengers = p // 乘机人集合

    b.person_id = userInfo.personId // 代理人
    b.last_name = userInfo.staffName // 员工名称代理人
    b.employee_number = userInfo.staffCode // 员工号代理人
    b.nt_account = userInfo.staffAccount // 登录人
    b.login_number = userInfo.staffCode // 登录人工号
    b.applyer_person_id = userInfo.personId // 登录人的personid
    b.office = userInfo.phone || '' // 分机号

    if(costDepartment === 0) {
      // 本部门
      b.company_id = costDepartmentData[0].companyId // 部门ID
      b.company_name = costDepartmentData[0].companyName // 部门名称
      b.sbu_id =costDepartmentData[0].sbuId // 利润中心
      b.costcenter_id = costDepartmentData[0].costCenter// 成本中心
      b.region_id = costDepartmentData[0].regionId // 地区ID
      b.region_name = costDepartmentData[0].regionName // 地区名称
    }else if(costDepartment === 1) {
      // 跨部门
      b.company_id = costDepartmentData[1].costCenter.companyId
      b.company_name = costDepartmentData[1].costCenter.companyName
      b.sbu_id = costDepartmentData[1].costCenter.sbuId
      b.costcenter_id = costDepartmentData[1].costCenter.ccId
      b.region_id = costDepartmentData[1].costCenter.regionId
      b.region_name = costDepartmentData[1].costCenter.regionName
      // owner
      b.carrier_id = costDepartmentData[1].costCenter.carrior // 行业ID
      b.over_supervisor_person_id = approverInfo.personId // 夸部门审批人(personid)
    }else if(costDepartment === 2) {
      // 项目
      b.company_id = costDepartmentData[3].projectInfo.companyId
      b.company_name = costDepartmentData[3].projectInfo.companyName
      b.sbu_id = costDepartmentData[3].projectInfo.sbuId
      b.costcenter_id = costDepartmentData[3].projectInfo.ccId
      b.region_id = costDepartmentData[3].projectInfo.regionId
      b.region_name = costDepartmentData[3].projectInfo.regionName
      // owner
      b.hasfixeddepartment = costDepartmentData[3].projectInfo.glHasFixedDepartment //GL项目是否有指定的部门 1指定的 0 未指定
      b.project_id = costDepartmentData[3].projectInfoSimple.projectId // 项目ID
      b.project_code = costDepartmentData[3].projectInfoSimple.projectCode // 项目编号
    }else{
      tost('费用部门选择有误')
      return
    }

    //b.task_id = 1 // 任务ID
    b.task_number = 1 // 任务号

    b.travel_purpose =1 // 其他

    b.isglProject = 1 // 是否是gl项目

    b.request_origin = '4' // 单据来源



    console.log(b)

    submitVoucher(b)

  }

  render() {

    const { selectPassenger, selectDepartment, submit, leftClick } = this

    const props = {...this.props, selectPassenger, selectDepartment, submit, leftClick}

    return (<Home {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
