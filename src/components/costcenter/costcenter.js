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
        <Header title="成本中心查询" left="取消" right="完成" leftClick={historyBack} />
        <div className="main scroll">
          <Search placeholder="成本中心编码" />
          <SimpleTitle title="最近订票的成本中心编码" />
          <SelectItem />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
