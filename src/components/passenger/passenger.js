import React from 'react'
import _ from 'lodash'
import Header from '../header/header'
import Search from '../search/search'
import SimpleTitle from '../simpleTitle/simpleTitle'
import SelectPassenger from '../selectPassenger/selectPassenger'
import {getPassenger, selectPassenger} from "../../action/passenger";

export default class Component extends React.Component {

  onChange = (value) => {
    const { userInfo } = this.props
    this.props.getPassengerCall(value, userInfo.bgId)
  }

  getSearchData = () => {
    const { passengerList=[], recentPassengerList=[], selectPassengerList=[], selectPassengerListCache=[], isSearch  } = this.props

    const allSelectList = selectPassengerList.concat(selectPassengerListCache)

    const list =  isSearch ? passengerList : recentPassengerList

    if(list.length === 0) {
      return []
    }
    return list.map((v,i)=>{

      const isChecked = _.findIndex(allSelectList, ['EMPLOYEE_NUMBER', v.EMPLOYEE_NUMBER]) === -1 ? false : true

      return{
        ...v,
        key: `key${i}`,
        value: `${v.LAST_NAME}(${v.EMPLOYEE_NUMBER})`,
        label: v.SBU_DESCRIPTION,
        isChecked,
      }
    })
  }

  getSelectData = () => {
    const { selectPassengerListCache=[] } = this.props
    if(selectPassengerListCache.length === 0) {
      return []
    }
    return selectPassengerListCache.map((v,i)=>({
      ...v,
      key: `key${i}`,
      value: `${v.LAST_NAME}(${v.EMPLOYEE_NUMBER})`,
      label: v.SBU_DESCRIPTION,
    }))
  }

  render() {
    const { historyBack, selectPassengerCache, deletePassengerCache, selectPassengerConfirm, isSearch } = this.props
    const selectedPassengerData = this.getSelectData()
    const searchPassengerData = this.getSearchData()
    return (
      <div className="wrap index clearfix">
        <Header title="选择乘机人" left="取消" right="完成" leftClick={historyBack} rightClick={selectPassengerConfirm} />
        <div className="main scroll">
          <Search placeholder="输入姓名／NT账号／手机号"  onChange={this.onChange} />
          {selectedPassengerData.length === 0 ? null : <SimpleTitle title="已选择" />}
          <SelectPassenger type="delete" data={selectedPassengerData} onDelete={deletePassengerCache} />
          {searchPassengerData.length === 0 ? null : <SimpleTitle title={`${isSearch ? '搜索结果' : '常用乘机人'}`} /> }
          <SelectPassenger type="select" data={searchPassengerData} onSelect={selectPassengerCache} />
          <SimpleTitle title="" />
        </div>
      </div>
    );
  }

}
