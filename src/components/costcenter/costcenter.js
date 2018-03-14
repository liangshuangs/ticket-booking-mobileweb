import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectItem from '../selectItem/selectItem'

export default class Component extends React.Component {

    onChange = (value) => {
      if(value) {
        this.searchType = 'normal'
        this.props.getCostCenterCall(value)
      }else{
        this.searchType = undefined
        this.props.getCostCenterRecentCall()
      }
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
    const selectData = this.getItemData()

    return (
      <div className="wrap index clearfix">
        <Header title="成本中心查询" left="取消" right="完成" leftClick={historyBack} rightClick={confirmCostCenter} />
        <div className="main scroll">
          <Search placeholder="成本中心编码" onChange={this.onChange} />
          {selectData.length === 0 ? null : <SimpleTitle title={this.searchType === undefined ? '最近订票的成本中心编码' : '搜索结果'}/>}
          <SelectItem data={selectData} onSelect={this.onSelect} selectKey={key} />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
