import React from 'react'
import './selectItem.scss'

export default class Component extends React.Component {

  getList = () => {
    const { data, onSelect, selectKey } = this.props
    if(data.length === 0) {
      return null
    }
    const li = data.map((v)=>{
      return <li key={v.key} className={`${selectKey && selectKey===v.key ? 'select' : ''}`}>
        <p>{v.value}</p>
        <p>{v.label}</p>
        {v.companyName ? <p>{v.companyName}</p> : null}
        {v.regionName ? <p>{v.regionName}</p> : null }
        <a onClick={()=>{onSelect(v)}}>
          <i className="iconfont icon-check"/>
          <i className="iconfont icon-checked"/>
        </a>
      </li>
    })

    return <ul>
      {li}
    </ul>
  }


  render() {
    return (
      <div className="select-item">
        {this.getList()}
      </div>
    );
  }

}
