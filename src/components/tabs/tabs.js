import React from 'react'
import './tabs.scss'

export default class Component extends React.Component {

  getTitle = () => {
    const { data, index, onClick } = this.props
    const li = data.map((v,i)=>{
      return <li key={i} className={index === i ? "active" : ""} onClick={()=>{onClick(i)}}>
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
    const { data, index } = this.props
    return data[index].panel
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
