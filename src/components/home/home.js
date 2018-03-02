import React from 'react'
import Header from '../header/header'
import Item from '../item/item'
import Member from '../member/member'
import Footer from '../footer/footer'

export default class Component extends React.Component {

  getItem = () => {
    const { selectDepartment, costDepartment, costDepartmentData } = this.props
    const { costCenter, parentStaffName } = costDepartmentData[costDepartment]
    if(costDepartment <=1) {
      return[<Item key={0} type="check" label="费用部门：" value={costDepartment === 0 ? "本部门结算" : "跨部门结算"} onClick={selectDepartment} />,
      <Item key={1} type="info" label="CC(成本中心)：" value={costCenter} />,
      <Item key={2} type="info" label="审批人：" value={parentStaffName} />]
    }else{
      return[<Item key={0} type="check" label="费用部门：" value="项目结算" onClick={selectDepartment} />,
      <Item key={1} type="info" label="项目编码：" value="123456" />,
      <Item key={2} type="info" label="项目名称：" value="123456" />,
      <Item key={3} type="info" label="审批人：" value="姚世琪" />]
    }
  }

  render() {
    const { selectPassenger, userInfo={} } = this.props
    const { accountName } = userInfo

    return (
      <div className="wrap index clearfix">
        <Header title="机票预订信息单" left="icon-return" right="icon-record" />
        <div className="main">
          <div className="body scroll">
            <Item type="info" label="申请人" value={accountName} />
            <Item className="noborder" type="check" label="乘机人：" value="选择乘机人" onClick={selectPassenger} />
            <Member selectPassenger={selectPassenger} />
            {this.getItem()}
          </div>
          <Footer hint/>
        </div>
      </div>
    );
  }

}
