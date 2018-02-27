import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectPassenger from '../selectPassenger/selectPassenger'

export default class Component extends React.Component {



  render() {
    return (
      <div className="wrap index clearfix">
        <Header title="选择乘机人" left="取消" right="完成" />
        <div className="main scroll">
          <Search placeholder="输入姓名／NT账号／手机号" />
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
