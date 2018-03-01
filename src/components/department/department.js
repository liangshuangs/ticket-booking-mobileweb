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
    return <div className="panel">
      <Item type="info" className="topborder" label="Company(公司):" value="亚信中国" />
      <Item type="info" label="Region(地区):" value="亚信中国" />
      <Item type="info" label="CC(成本中心):" value="亚信中国" />
      <Item type="info" label="P/L Code(利润中心):" value="亚信中国" />
      <Item type="info" label="审批人" value="亚信中国" />
    </div>
  }

  getOtherPanel = () => {
    const { gotoCostcenter, toggleApproverModal } = this.props
    return <div className="panel">
      <Item type="check" className="topborder" label="CC(成本中心):" value="亚信中国" onClick={gotoCostcenter} />
      <Item type="check" label="跨部门审批人:" value="选择审批人" onClick={()=>{toggleApproverModal()}} />
    </div>
  }

  getProjectPanel = () => {
    const { gotoProject, gotoRemark } = this.props
    return <div className="panel">
      <Item type="check" className="topborder" label="项目编码:" value="亚信中国" onClick={gotoProject} />
      <Item type="info" label="其他:" value="请输入备注" onClick={gotoRemark} />
    </div>
  }


  render() {
    const { department={}, historyBack, updateCostDepartment, changeTabsIndex, approverModalShow, toggleApproverModal } = this.props
    const { costDepartment=0, tabsIndex=0 } = department
    return (
      <div className="wrap index clearfix">
        <Header title="选择费用部门" left="icon-return" leftClick={historyBack} />
        <div className="main">
          <div className="body scroll department">
            <h2>费用部门</h2>
            <Tabs data={this.getTabData()} changeTabsIndex={changeTabsIndex} tabsIndex={tabsIndex} />
          </div>
        </div>
        <Footer onClick={()=>{updateCostDepartment(tabsIndex)}} />
        {approverModalShow ? <Modal onMask={toggleApproverModal}>
          <Approver onClose={toggleApproverModal} />
        </Modal> : null}
      </div>
    );
  }

}
