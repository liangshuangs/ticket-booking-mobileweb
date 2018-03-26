import React from 'react'
import Header from '../header/header'
import Item from '../item/item'
import Member from '../member/member'
import Footer from '../footer/footer'
import Modal from '../modal/modal'

export default class Component extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      forever: false
    }
  }

  getItem = () => {
    const { selectDepartment, costDepartment, costDepartmentData, approverInfo } = this.props
    if(costDepartment === 0) {
      console.log('approverInfo',approverInfo)
      const { costCenter, parentStaffName } = costDepartmentData[0]
      return[<Item key={0} type="check" label="费用部门：" value="本部门结算" onClick={selectDepartment} />,
      <Item key={1} type="info" label="CC(成本中心)：" value={costCenter} />,
      <Item key={2} type="info" label="审批人：" value={approverInfo.name ? approverInfo.name : parentStaffName} />]
    }else if(costDepartment === 1){
      const { costCenter, approver } = costDepartmentData[1]
      return[<Item key={0} type="check" label="费用部门：" value="跨部门结算" onClick={selectDepartment} />,
        <Item key={1} type="info" label="CC(成本中心)：" value={costCenter.ccId} />,
        <Item key={2} type="info" label="审批人：" value={approverInfo.name ? approverInfo.name : approver.text} />]
    }else{
      const {projectInfoSimple, approverInfo: approverInfoThis} = costDepartmentData[2]

      console.log('projectInfoSimple',projectInfoSimple)
      return[<Item key={0} type="check" label="费用部门：" value="项目结算" onClick={selectDepartment} />,
      <Item key={1} type="info" label="项目编码：" value={projectInfoSimple.projectCode} />,
      <Item key={2} type="info" label="项目名称：" value={projectInfoSimple.projectName} />,
      <Item key={3} type="info" label="审批人：" value={approverInfo.name ? approverInfo.name : approverInfoThis.name} />]
    }
  }

  doNotRemind = () => {
    const {forever} = this.state
    const { doNotRemind } = this.props
    doNotRemind(forever)
  }

  setForever = () => {
    const forever = !this.state.forever
    this.setState({forever})
  }

  render() {
    const {forever} = this.state
    const { selectPassenger, userInfo={}, selectPassengerList=[], deletePassengerCall, submit, leftClick, gotoBaoku, noDeafultPassenger, remindIs=false } = this.props
    const { accountName } = userInfo

    return (
      <div className="wrap index clearfix">
        <Header title="机票预订信息单" left="icon-return" right="icon-record" leftClick={leftClick} rightClick={gotoBaoku} />
        <div className="main">
          <div className="body scroll f-bt">
            <Item type="info" label="申请人" value={accountName} />
            <Item className="noborder" type="check" label="乘机人：" value="选择乘机人" onClick={selectPassenger} />
            <Member selectPassenger={selectPassenger} deletePassenger={deletePassengerCall} selectPassengerList={selectPassengerList} />
            {this.getItem()}
          </div>
          <Footer hint onClick={()=>{submit()}} />
        </div>
        {noDeafultPassenger ? <Modal className="msg">
          <p className="modal-msg">当前帐号尚无机票预订权限</p>
        </Modal> : null }
        {remindIs ? <Modal>
          <div className="modal-panel">
            <div className="modal-body">
              <p className="modal-info">由于业务规则的调整，乘机人和审批人需要在信息单页面提前选择，提交订单页面不可修改，请知悉～</p>
              <div className={`modal-check ${forever ? 'checkeds' : ''}`} onClick={()=>{this.setForever()}}>
                <label>
                  <i className="iconfont icon-check"/>
                  <i className="iconfont icon-checkeds"/>
                </label>
                <span>我知道了，不再提醒</span>
              </div>
            </div>
            <div className="modal-footer">
              <a onClick={()=>{this.doNotRemind()}}>确定</a>
            </div>
          </div>
        </Modal> : null}
      </div>
    );
  }

}
