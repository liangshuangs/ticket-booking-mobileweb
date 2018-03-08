import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectItem from '../selectItem/selectItem'

export default class Component extends React.Component {

    onChange = (value) => {
        this.props.getCostCenterCall(value)
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

    onSelect = (data) => {
      const { selectCostCenter } = this.props
      selectCostCenter(data)
    }



  render() {
    const { historyBack, confirmCostCenter, selectCostCenterData={} } = this.props
    const {key=null} = selectCostCenterData

    return (
      <div className="wrap index clearfix">
        <Header title="成本中心查询" left="取消" right="完成" leftClick={historyBack} rightClick={confirmCostCenter} />
        <div className="main scroll">
          <Search placeholder="成本中心编码" onChange={this.onChange} />
          <SimpleTitle title="最近订票的成本中心编码" />
          <SelectItem data={this.getItemData()} onSelect={this.onSelect} selectKey={key} />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
