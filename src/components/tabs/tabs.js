import React from 'react'
import './tabs.scss'

export default class Component extends React.Component {

  constructor(props) {
    super(props)
  }

  getTitle = () => {
    const { data, tabsIndex, changeTabsIndex } = this.props
    const li = data.map((v,i)=>{
      return <li key={i} className={tabsIndex === i ? "active" : ""} onClick={()=>{changeTabsIndex(i)}}>
        <i className="iconfont icon-check" />
        <i className="iconfont icon-checked" />
        <span>{v.name}</span>
      </li>
    })

    return <ul className="title">
      {li}
    </ul>
  }

  getPanel = () => {
    const { data, tabsIndex } = this.props
    return data[tabsIndex].panel
  }

  render() {
    return (
      <div className="tabs">
        {this.getTitle()}
        {this.getPanel()}
      </div>
    );
  }

}
