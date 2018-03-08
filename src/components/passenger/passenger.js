import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectPassenger from '../selectPassenger/selectPassenger'
import {getPassenger} from "../../action/passenger";

export default class Component extends React.Component {

  onChange = (value) => {
    const { userInfo } = this.props
    this.props.getPassengerCall(value, userInfo.bgId)
  }

  getItemData = () => {
    const { costCenterList } = this.props
    return costCenterList.map((v,i)=>({
      ...v,
      key: `key${i}`,
      value: v.ccId,
      label: v.ccName,
    }))
  }

  render() {
    const { historyBack } = this.props
    return (
      <div className="wrap index clearfix">
        <Header title="选择乘机人" left="取消" right="完成" leftClick={historyBack} />
        <div className="main scroll">
          <Search placeholder="输入姓名／NT账号／手机号"  onChange={this.onChange} />
          <SimpleTitle title="已选择" />
          <SelectPassenger />
          <SimpleTitle title="常用乘机人" />
          <SelectPassenger />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
