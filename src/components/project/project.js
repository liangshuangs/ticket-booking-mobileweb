import React from 'react'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectItem from '../selectItem/selectItem'

export default class Component extends React.Component {

  onChange = (value) => {
    if(value) {
      this.searchType = 'normal'
      this.props.getProjectCall(value)
    }else{
      this.searchType = undefined
      this.props.getProjectRecentCall()
    }
  }

  getItemData = () => {
    const { projectInfoList } = this.props
    return projectInfoList.map((v,i)=>({
      ...v,
      key: `key${i}`,
      value: v.projectCode,
      label: v.projectName,
    }))
  }

  onSelect = (data) => {
    const { selectProjectInfo } = this.props
    selectProjectInfo(data)
  }

  render() {
    const { historyBack, selectProjectInfoData, confirmProjectInfo, onScroll } = this.props
    const {key=null} = selectProjectInfoData
    const selectData = this.getItemData()

    return (
      <div className="wrap index clearfix">
        <Header title="项目查询" left="取消" right="完成" leftClick={historyBack} rightClick={confirmProjectInfo} />
        <div className="main flexsearch">
          <Search placeholder="项目编码/项目名称" onChange={this.onChange} />
          <div className="body scroll" onScroll={onScroll}>
            {selectData.length === 0 ? null : <SimpleTitle title={this.searchType === undefined ? '最近订票的项目' : '搜索结果'}/>}
            <SelectItem data={selectData} onSelect={this.onSelect} selectKey={key} />
            <SimpleTitle title="" />
          </div>
        </div>
      </div>
    );
  }

}
