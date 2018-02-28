import React from 'react'
import './tabs.scss'

export default class Component extends React.Component {

  constructor(props) {
    super(props)
    const {index=0} = this.props
    this.state = {
      tabIndex: index
    }
  }

  setTabIndex = (tabIndex) => {
    this.setState({tabIndex})
  }

  getTitle = () => {
    const { data } = this.props
    const { tabIndex } = this.state
    const li = data.map((v,i)=>{
      return <li key={i} className={tabIndex === i ? "active" : ""} onClick={()=>{this.setTabIndex(i)}}>
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
    const { data } = this.props
    const { tabIndex } = this.state
    return data[tabIndex].panel
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
