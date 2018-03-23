import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import md5 from 'md5'
//import { Base64 } from 'js-base64'
import Home from '../components/home/home'
import { changeTabsIndex } from '../action/department'
import { deletePassenger, getPassenger, selectPassenger, setDefaultPassenger } from '../action/passenger'
import { getApprover, setApprover } from '../action/approver'
import { submitVoucher } from '../action/home'
import { doNotRemind, isRemind, getRemind, setRemind } from '../action/remind'
import tost from '../components/tost/tost'


const mapStateToProps = state => ({
  costDepartment: state.department.costDepartment,
  costDepartmentData: state.department.costDepartmentData,
  userInfo: state.user.info,
  selectPassengerList: state.passenger.selectList,
  defaultPassengerIsSet: state.passenger.defaultIsSet,
  approverInfo: state.approver.info,
  remark: state.remark,
  remindIs:state.remind.is,
  remindDoNot: state.remind.doNotRemind,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeTabsIndex,
    deletePassenger,
    getPassenger,
    selectPassenger,
    setDefaultPassenger,
    getApprover,
    setApprover,
    submitVoucher,
    doNotRemind,
    isRemind,
    getRemind,
    setRemind,
  }, dispatch)
);

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      noDeafultPassenger: false,
      isRemind: false,
    }
  }

  componentWillMount(){
    const { changeTabsIndex, costDepartment=0, defaultPassengerIsSet } = this.props
    changeTabsIndex(costDepartment) // 重置 tabsIndex
    this.resetApprover() // 尝试 重置 审批人
    //console.log('defaultPassengerIsSet',defaultPassengerIsSet)
    if(!defaultPassengerIsSet){
      // 没有设置过默认乘机人
      // 使用当前用户nt搜索乘机人 如果有设计为默认乘机人 如果没有 提示 “当前帐号尚无机票预订权限”
      this.getDefaultPassenger()
    }
  }

  componentDidMount() {
    const {remindDoNot, isRemind, getRemind, userInfo} = this.props
    getRemind(userInfo.personId).then(res=>{
      if(!remindDoNot && res && res.response && res.response.result === '0000' && res.response.isRemind === 0) {
        // 已经点击确定按钮 防止路由返回 不要多次提醒
        isRemind(true)
      }
    })
  }

  componentWillReceiveProps(){
    this.resetApprover() // 尝试 重置 审批人
  }

  // 获取默认乘机人
  getDefaultPassenger = () => {
    const { userInfo, getPassenger, selectPassenger, setDefaultPassenger } = this.props
    getPassenger(userInfo.staffAccount, userInfo.bgId,1,1,0).then(res=>{
      if(res && res.response && res.response.result === '0000' && res.response.data && res.response.data.length > 0) {
        selectPassenger({...res.response.data[0],avatar: userInfo.headIcon}) // 把该用户设置为默认乘客
        setDefaultPassenger() // 设置默认乘机人
      }else{
        // 没有默认乘机人
        this.setState({noDeafultPassenger: true})
      }
    })
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

  // 跳转到宝库 查看 订单列表
  gotoBaoku = () => {
    // TODO
    const {personId} = this.props.userInfo
    const timestamp = this.getYMDHMS(new Date())
    const bkcid = '49003'
    const emnum = personId
    const direction = 'H5'
    const homePage='airorder'
    const salt = '946fd49ecf29691e97446af73e0ae98a'
    const sign = md5(`${timestamp}${bkcid}${emnum}${direction}${homePage}${salt}`)
    const bkurl = 'http://apics.baoku.com/open/api/login/oaLogin'
    const url = `${bkurl}?timestamp=${timestamp}&bkcid=${bkcid}&emnum=${emnum}&sign=${sign}&direction=${direction}&homePage=${homePage}`
    this.openNewWindow(url)
  }

  // 打开新的 webview
  openNewWindow = (url) => {
    // 测试 TODO
    //window.location.href = url
    //console.log(url)
    if(window.kara) {
      window.kara.openURL({
        url:url,
      })
    }else{
      document.addEventListener('JSSDKReady', function(){
        window.kara.openURL({
          url:url,
        })
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
    //console.log('尝试重置审批人',this.props)
    if(Object.keys(approverInfo).length === 0) {
      // 默认没有设置审批人 取 userInfo 的信息设置 为默认的审批人
      const {parentStaffName:name, parentStaffId:personId, costCenter:ccId, sbuId} = userInfo
      //console.log('默认审批人',{name,personId,ccId,sbuId})
      setApprover({name,personId,ccId,sbuId}) // 默认审批人
      return
    }

    // 开始对比
    if(_.findIndex(selectPassengerList,['PERSON_ID',approverInfo.personId]) !== -1) {
      //  如果审批人 在 乘机人 中
      // 先获取
      //console.log('获取新的审批人')
      getApprover(approverInfo.personId,approverInfo.sbuId,approverInfo.ccId).then(res=>{
        if(res && res.response && res.response.result === '0000') {
          const { text:name, value:personId } = res.response.data[0]
          // 更新审批人 ccId sbuId 不变
          setApprover({name,personId,sbuId:approverInfo.sbuId,ccId:approverInfo.ccId})
        }
      })
    }

  }

  submit = () => {
    // 提交参数
    const { submitVoucher, costDepartment=0, selectPassengerList, userInfo, costDepartmentData, approverInfo, remark } = this.props

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
    b.request_origin = '4' // 单据来源

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
      const i = costDepartmentData[2].projectInfo
      const is = costDepartmentData[2].projectInfoSimple
      b.company_id = i.companyId
      b.company_name = i.companyName
      b.sbu_id = i.sbuId
      b.costcenter_id = i.ccId
      b.region_id = i.regionId
      b.region_name = i.regionName
      // owner
      b.hasfixeddepartment = i.glHasFixedDepartment //GL项目是否有指定的部门 1指定的 0 未指定
      b.project_id = is.projectId // 项目ID
      b.project_code = is.projectCode // 项目编号
      b.isglProject = is.projectType === '-1' ? '1' : '0' // 是否是gl项目

      b.task_number = i.taskNumberData[0].text.split('--')[0] // 任务号
      b.task_id = i.taskNumberData[0].value // 任务ID

      b.travel_purpose = remark.text // 其他

    }else{
      tost('费用部门选择有误')
      return
    }

    //console.log(b,JSON.stringify(b))

    submitVoucher(b).then(res=>{
      if(res && res.response && res.response.result === '0000' && res.response.data) {
        const o = res.response.data[0]
        let url = `${o.bkurl}/?`
        for(let i in o) {
          if(i !== 'bkurl' && i !== 'parameters') {
            url = `${url}&${i}=${o[i]}`
          }
        }
        //this.openNewWindow(`http://localhost:3000/?url=${Base64.encodeURI('http://localhost:63342/test/index.html?_ijt=77f4b689oilihvn23n9r400ad5')}&hideNavigationBar=true`)
        //this.openIframe(url)
        this.openNewWindow(`${url}&hideNavigationBar=true`)
      }else{
        tost(res.response.message || '提交出错')
      }
    })

  }

  doNotRemind = (forever) => {
    const {doNotRemind, setRemind, userInfo} = this.props
    if(forever) {
      // 永久不提醒
      doNotRemind()
      setRemind(userInfo.personId) // 永久不提醒
    }else{
      doNotRemind()
    }
  }

  render() {

    const { selectPassenger, selectDepartment, submit, leftClick, gotoBaoku, doNotRemind } = this
    const { noDeafultPassenger } = this.state
    const props = {...this.props, selectPassenger, selectDepartment, submit, leftClick, gotoBaoku, noDeafultPassenger, doNotRemind}
    return (<Home {...props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
