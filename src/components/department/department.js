import React from 'react'
import './department.scss'
import Header from '../header/header'
import Footer from '../footer/footer'
import Item from '../item/item'
import Tabs from '../tabs/tabs'
import Modal from '../modal/modal'
import Approver from '../approver/approver'

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
      <Item type="info" label="审批人" value={parentStaffName} />
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
    const { gotoProject, gotoRemark, department, remark } = this.props
    const { costDepartmentData } = department
    const { projectInfo, projectInfoSimple, approverInfo } = costDepartmentData[2]
    if( Object.keys(projectInfo).length === 0) {
      return <div className="panel">
        <Item type="check" className="topborder" label="项目编码:" value="选择项目" onClick={gotoProject} />
        <Item type="info" label="其他:" value={remark.text ? `${remark.text.slice(0,10)}...` : '请输入备注'} onClick={gotoRemark} />
      </div>
    }else{
      const {companyId,projectCode,projectId,projectName,projectType,sbuId} = projectInfoSimple
      const {regionId, ccId} = projectInfo
      const {name} = approverInfo
      return <div className="panel">
        <Item type="check" className="topborder" label="项目编码:" value={projectId} onClick={gotoProject} />
        <Item type="check" label="项目名称:" value={projectName} onClick={gotoProject} />
        <Item type="info" label="任务号:" value={projectCode}  />
        <Item type="info" label="Company(公司):" value={companyId} />
        <Item type="info" label="Region(地区):" value={regionId} />
        <Item type="info" label="CC(成本中心):" value={ccId}  />
        <Item type="info" label="P/L Code(利润中心):" value={sbuId} />
        <Item type="info" label="审批人" value={name} />
        <Item type="info" label="其他:" value={remark.text ? `${remark.text.slice(0,10)}...` : '请输入备注'} onClick={gotoRemark} />
      </div>
    }
  }


  render() {
    const { department={}, gotoHome, updateCostDepartment, changeTabsIndex, approverModalShow, toggleApproverModal, selectOtherDepartmentApprover } = this.props
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
      </div>
    );
  }

}
