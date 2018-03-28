import React from 'react'
import './department.scss'
import Header from '../header/header'
import Footer from '../footer/footer'
import Item from '../item/item'
import Tabs from '../tabs/tabs'
import Modal from '../modal/modal'
import Approver from '../approver/approver'
import Task from '../task/task'

export default class Component extends React.Component {

  getTabData = () => {
    return [
      {
        name: "本部门",
        panel: this.getOwnPanel()
      },
      {
        name: "跨部门",
        panel: this.getOtherPanel()
      },
      {
        name: "项目",
        panel: this.getProjectPanel()
      }
    ]
  }

  getOwnPanel = () => {
    const { department } = this.props
    const { costDepartmentData } = department
    const { companyName, regionName, costCenter, sbuId, parentStaffName } = costDepartmentData[0]
    return <div className="panel">
      <Item type="info" className="topborder" label="Company(公司):" value={companyName} />
      <Item type="info" label="Region(地区):" value={regionName} />
      <Item type="info" label="CC(成本中心):" value={costCenter} />
      <Item type="info" label="P/L Code(利润中心):" value={sbuId} />
    </div>
  }

  getOtherPanel = () => {
    const { gotoCostcenter, toggleApproverModal, department } = this.props
    const { costDepartmentData } = department
    const { costCenter, approver={} } = costDepartmentData[1]
    console.log('costDepartmentData[1]',costDepartmentData[1])
    if( Object.keys(costCenter).length === 0) {
      return <div className="panel">
        <Item type="check" className="topborder" label="CC(成本中心):" value="选择成本中心" onClick={gotoCostcenter} />
        <Item type="check" label="跨部门审批人:" value="选择审批人" onClick={()=>{toggleApproverModal()}} />
      </div>
    }else{
      const { companyName, regionName, sbuId, ccId } = costCenter
      const {text:approverText="选择审批人"} = approver
      return <div className="panel">
        <Item type="info" className="topborder" label="Company(公司):" value={companyName} />
        <Item type="info" label="Region(地区):" value={regionName} />
        <Item type="check" label="CC(成本中心):" value={ccId} onClick={gotoCostcenter} />
        <Item type="info" label="P/L Code(利润中心):" value={sbuId} />
        <Item type="check" label="跨部门审批人:" value={approverText} onClick={()=>{toggleApproverModal()}} />
      </div>
    }
  }

  getProjectPanel = () => {
    const { gotoProject, gotoRemark, department, remark, toggleTaskModal } = this.props
    const { costDepartmentData } = department
    const { projectInfo, projectInfoSimple, approverInfo, taskInfo } = costDepartmentData[2]
    if( Object.keys(projectInfo).length === 0) {
      return <div className="panel">
        <Item type="check" className="topborder" label="项目编码:" value="选择项目" onClick={gotoProject} />
        <Item type="info" label="其他:" value={remark.text ? `${remark.text.slice(0,10)}...` : '请输入备注'} onClick={gotoRemark} />
      </div>
    }else{
      const {projectCode,projectName,projectType,sbuId} = projectInfoSimple
      const {companyName, regionName, ccId, taskNumberData=[]} = projectInfo // taskNumberData 数组 可空 如果是多个需要下拉选择
      const {name} = approverInfo
      return <div className="panel">
        <Item type="check" className="topborder" label="项目编码:" value={projectCode} onClick={gotoProject} />
        <Item type="check" label="项目名称:" value={projectName} onClick={gotoProject} />
        {taskNumberData.length > 0 ? <Item type="check" label="任务号:" value={taskInfo.text && taskInfo.value ? `${taskInfo.text}(${taskInfo.value})` : '选择任务号'} onClick={()=>{toggleTaskModal()}}  /> : null}
        <Item type="info" label="Company(公司):" value={companyName} />
        <Item type="info" label="Region(地区):" value={regionName} />
        <Item type="info" label="CC(成本中心):" value={ccId}  />
        <Item type="info" label="P/L Code(利润中心):" value={sbuId} />
        <Item type="info" label="项目经理" value={name} />
        <Item type="info" label="其他:" value={remark.text ? `${remark.text.slice(0,10)}...` : '请输入备注'} onClick={gotoRemark} />
      </div>
    }
  }


  render() {
    const { department={}, gotoHome, updateCostDepartment, changeTabsIndex, approverModalShow, toggleApproverModal, taskModalShow, toggleTaskModal, selectOtherDepartmentApprover, selectProjectTask } = this.props
    const { costDepartment=0, tabsIndex=0 } = department
    return (
      <div className="wrap index clearfix">
        <Header title="选择费用部门" left="icon-return" leftClick={gotoHome} />
        <div className="main">
          <div className="body scroll department">
            <h2>费用部门</h2>
            <Tabs data={this.getTabData()} changeTabsIndex={changeTabsIndex} tabsIndex={tabsIndex} />
          </div>
        </div>
        <Footer onClick={()=>{updateCostDepartment(tabsIndex)}} />
        {approverModalShow ? <Modal onMask={toggleApproverModal}>
          <Approver onClose={toggleApproverModal} data={department.costDepartmentData[1].approverData} onSelect={selectOtherDepartmentApprover} />
        </Modal> : null}
        {taskModalShow ? <Modal onMask={toggleTaskModal}>
          <Task onClose={toggleTaskModal} data={department.costDepartmentData[2].projectInfo.taskNumberData} onSelect={selectProjectTask} />
        </Modal> : null}
      </div>
    );
  }

}
