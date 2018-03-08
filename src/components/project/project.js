import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectItem from '../selectItem/selectItem'

export default class Component extends React.Component {

  onChange = (value) => {
    this.props.getProjectCall(value)
  }

  getItemData = () => {
    const { projectInfoList } = this.props
    return projectInfoList.map((v,i)=>({
      ...v,
      key: `key${i}`,
      value: v.projectId,
      label: v.projectName,
    }))
  }

  onSelect = (data) => {
    const { selectProjectInfo } = this.props
    selectProjectInfo(data)
  }

  render() {
    const { historyBack, selectProjectInfoData, confirmProjectInfo } = this.props
    const {key=null} = selectProjectInfoData
    return (
      <div className="wrap index clearfix">
        <Header title="项目查询" left="取消" right="完成" leftClick={historyBack} rightClick={confirmProjectInfo} />
        <div className="main scroll">
          <Search placeholder="项目编码/项目名称" onChange={this.onChange} />
          <SimpleTitle title="最近订票的项目" />
          <SelectItem data={this.getItemData()} onSelect={this.onSelect} selectKey={key} />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
