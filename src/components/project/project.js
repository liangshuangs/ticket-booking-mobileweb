import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectItem from '../selectItem/selectItem'

export default class Component extends React.Component {



  render() {
    const { historyBack } = this.props
    return (
      <div className="wrap index clearfix">
        <Header title="项目查询" left="取消" right="完成" leftClick={historyBack} />
        <div className="main scroll">
          <Search placeholder="项目编码/项目名称" />
          <SimpleTitle title="最近订票的项目" />
          <SelectItem />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
