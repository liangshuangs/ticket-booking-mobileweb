import React from 'react'
import Header from '../header/header'
import Item from '../item/item'
import Member from '../member/member'
import Footer from '../footer/footer'

export default class Component extends React.Component {



  render() {
    const { selectPassenger } = this.props
    return (
      <div className="wrap index clearfix">
        <Header title="机票预订信息单" left="icon-return" right="icon-record" />
        <div className="main">
          <div className="body scroll">
            <Item type="info" label="申请人" value="张三" />
            <Item className="noborder" type="check" label="乘机人：" value="选择乘机人" onClick={selectPassenger} />
            <Member selectPassenger={selectPassenger} />
            <Item type="check" label="费用部门：" value="成本部门结算" />
            <Item type="info" label="CC(成本中心)：" value="123456" />
            <Item type="info" label="审批人：" value="姚世琪" />
          </div>
          <Footer hint/>
        </div>
      </div>
    );
  }

}
